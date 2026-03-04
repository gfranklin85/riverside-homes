"use server";

import { createServerSupabaseClient } from "@/lib/supabase";
import { Resend } from "resend";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const source = formData.get("source") as string;
  const address = formData.get("address") as string;
  const preferredDate = formData.get("preferred_date") as string;
  const preferredTime = formData.get("preferred_time") as string;

  if (!name || !name.trim()) {
    return { status: "error", message: "Name is required." };
  }
  if (!phone || !phone.trim()) {
    return { status: "error", message: "Phone number is required." };
  }

  try {
    const supabase = createServerSupabaseClient();

    const { error } = await supabase.from("leads").insert({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      message: message?.trim() || null,
      source: source || "unknown",
      address: address?.trim() || null,
      preferred_date: preferredDate?.trim() || null,
      preferred_time: preferredTime?.trim() || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
      };
    }

    // Send email notification (non-blocking — don't fail the form if email fails)
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const sourceLabel = source?.replace(/-/g, " ") || "unknown";

      const dateLabel = preferredDate
        ? new Date(preferredDate + "T00:00:00").toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : null;

      await resend.emails.send({
        from: "RiversideHomes.co <onboarding@resend.dev>",
        to: ["gregfranklin523@gmail.com", "matthewpf117@gmail.com"],
        subject: `New Lead: ${name.trim()} — ${sourceLabel}`,
        html: `
          <h2>New Lead from RiversideHomes.co</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name.trim()}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone.trim()}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email?.trim() || "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Address</td><td style="padding:8px;">${address?.trim() || "—"}</td></tr>
            ${dateLabel ? `<tr><td style="padding:8px;font-weight:bold;">Preferred Date</td><td style="padding:8px;">${dateLabel}</td></tr>` : ""}
            ${preferredTime?.trim() ? `<tr><td style="padding:8px;font-weight:bold;">Preferred Time</td><td style="padding:8px;">${preferredTime.trim()}</td></tr>` : ""}
            <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${message?.trim() || "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Source</td><td style="padding:8px;">${sourceLabel}</td></tr>
          </table>
        `,
      });
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }

    const isScheduled = preferredDate?.trim() || preferredTime?.trim();
    return {
      status: "success",
      message: isScheduled
        ? "Thank you! Your appointment has been requested. We'll confirm shortly."
        : "Thank you! We'll be in touch soon.",
    };
  } catch (err) {
    console.error("Lead submission error:", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
