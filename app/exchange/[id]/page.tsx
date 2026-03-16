import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LeadFormProvider from "@/app/components/LeadFormProvider";
import { MOCK_LISTINGS } from "../data/mockListings";
import PropertyDetailClient from "./components/PropertyDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = MOCK_LISTINGS.find((l) => l.id === id);
  if (!listing) return {};
  return {
    title: `${listing.title} | RiversideHomes Exchange`,
    description: listing.description,
  };
}

export function generateStaticParams() {
  return MOCK_LISTINGS.map((l) => ({ id: l.id }));
}

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params;
  const listing = MOCK_LISTINGS.find((l) => l.id === id);
  if (!listing) notFound();

  return (
    <LeadFormProvider>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1">
          <PropertyDetailClient listing={listing} />
        </main>
        <Footer />
      </div>
    </LeadFormProvider>
  );
}
