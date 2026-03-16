export type ListingType = "owner" | "realtor" | "developer";

export type DealType =
  | "off-market"
  | "seller-finance"
  | "value-add"
  | "fractional";

export type PropertyType =
  | "single-family"
  | "multi-family"
  | "condo"
  | "commercial"
  | "land"
  | "mixed-use";

export type VisibilityTier = "free" | "featured" | "priority" | "spotlight";

export interface ListingFinancials {
  monthlyRent: number | null;
  monthlyExpenses: number | null;
  propertyTaxes: number | null; // annual
  hoa: number | null; // monthly
  capRate: number | null; // stored as percentage e.g. 6.4
  coopCommission: number | null; // Realtor-only, percentage e.g. 2.5
}

export interface Listing {
  id: string;
  listingType: ListingType;
  dealType: DealType;
  propertyType: PropertyType;
  title: string;
  address: string;
  description: string;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  askingPrice: number;
  imageUrls: string[];
  financials: ListingFinancials;
  visibilityTier: VisibilityTier;
  posterName: string;
  posterBrokerage: string | null;
  posterDreNumber: string | null;
  createdAt: string;
}

// Client-side form state (all strings for HTML input compatibility)
export interface ListingFormData {
  // Step 1
  listingType: ListingType | null;
  title: string;
  address: string;
  propertyType: PropertyType | null;
  beds: string;
  baths: string;
  sqft: string;
  askingPrice: string;
  description: string;
  posterName: string;
  posterBrokerage: string;
  posterDreNumber: string;
  // Step 2
  imageUrls: string[];
  // Step 3
  monthlyRent: string;
  monthlyExpenses: string;
  propertyTaxes: string;
  hoa: string;
  dealType: DealType | null;
  coopCommission: string;
  // Step 4
  visibilityTier: VisibilityTier;
}

export type ListingFormState = {
  status: "idle" | "success" | "error";
  message: string;
  listingId?: string;
};
