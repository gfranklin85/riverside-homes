"use server";

import { createServerSupabaseClient } from "@/lib/supabase";
import type { ListingFormState } from "@/app/types/listing";

export async function submitListing(
  _prevState: ListingFormState,
  formData: FormData
): Promise<ListingFormState> {
  const listingType = formData.get("listingType") as string;
  const posterName = formData.get("posterName") as string;
  const posterBrokerage = formData.get("posterBrokerage") as string;
  const posterDreNumber = formData.get("posterDreNumber") as string;
  const title = formData.get("title") as string;
  const address = formData.get("address") as string;
  const description = formData.get("description") as string;
  const propertyType = formData.get("propertyType") as string;
  const beds = formData.get("beds") as string;
  const baths = formData.get("baths") as string;
  const sqft = formData.get("sqft") as string;
  const askingPrice = formData.get("askingPrice") as string;
  const dealType = formData.get("dealType") as string;
  const imageUrls = formData.getAll("imageUrls") as string[];
  const monthlyRent = formData.get("monthlyRent") as string;
  const monthlyExpenses = formData.get("monthlyExpenses") as string;
  const propertyTaxes = formData.get("propertyTaxes") as string;
  const hoa = formData.get("hoa") as string;
  const coopCommission = formData.get("coopCommission") as string;
  const visibilityTier = formData.get("visibilityTier") as string;

  if (!listingType) {
    return { status: "error", message: "Listing type is required." };
  }
  if (!posterName || !posterName.trim()) {
    return { status: "error", message: "Your name is required." };
  }
  if (!title || !title.trim()) {
    return { status: "error", message: "Property title is required." };
  }
  if (!address || !address.trim()) {
    return { status: "error", message: "Property address is required." };
  }
  if (!askingPrice || isNaN(parseFloat(askingPrice))) {
    return { status: "error", message: "Asking price is required." };
  }

  // Compute cap rate server-side
  const askingPriceNum = parseFloat(askingPrice) || 0;
  const annualRent = (parseFloat(monthlyRent) || 0) * 12;
  const annualExpenses = (parseFloat(monthlyExpenses) || 0) * 12;
  const annualTaxes = parseFloat(propertyTaxes) || 0;
  const annualHOA = (parseFloat(hoa) || 0) * 12;
  const noi = annualRent - annualExpenses - annualTaxes - annualHOA;
  const capRate =
    askingPriceNum > 0 && annualRent > 0
      ? parseFloat(((noi / askingPriceNum) * 100).toFixed(3))
      : null;

  // Filter empty image URLs
  const filteredImageUrls = imageUrls.filter((url) => url.trim() !== "");

  try {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("listings")
      .insert({
        listing_type: listingType,
        poster_name: posterName.trim(),
        poster_brokerage: posterBrokerage?.trim() || null,
        poster_dre_number: posterDreNumber?.trim() || null,
        title: title.trim(),
        address: address.trim(),
        description: description?.trim() || null,
        property_type: propertyType || null,
        beds: beds ? parseInt(beds) : null,
        baths: baths ? parseFloat(baths) : null,
        sqft: sqft ? parseInt(sqft) : null,
        asking_price: parseFloat(askingPrice),
        deal_type: dealType || null,
        image_urls: filteredImageUrls,
        monthly_rent: monthlyRent ? parseFloat(monthlyRent) : null,
        monthly_expenses: monthlyExpenses ? parseFloat(monthlyExpenses) : null,
        property_taxes: propertyTaxes ? parseFloat(propertyTaxes) : null,
        hoa: hoa ? parseFloat(hoa) : null,
        cap_rate: capRate,
        coop_commission: coopCommission ? parseFloat(coopCommission) : null,
        visibility_tier: visibilityTier || "free",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
      };
    }

    return {
      status: "success",
      message:
        "Your listing has been submitted! It will be reviewed and published shortly.",
      listingId: data?.id,
    };
  } catch (err) {
    console.error("Listing submission error:", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
