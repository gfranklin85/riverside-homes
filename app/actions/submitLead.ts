"use server";

import { createServerSupabaseClient } from "@/lib/supabase";

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
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return {
        status: "error",
        message: `Error: ${error.message} (${error.code})`,
      };
    }

    return {
      status: "success",
      message: "Thank you! We'll be in touch soon.",
    };
  } catch (err) {
    console.error("Lead submission error:", err);
    return {
      status: "error",
      message: `Error: ${err instanceof Error ? err.message : "Unknown error"}`,
    };
  }
}
