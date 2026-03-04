import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riversidehomes.co"),
  title: "RiversideHomes.co | Sell Your Riverside Home the Simple Way",
  description:
    "Find out what your Riverside home is worth and plan your next move. Simple process, clear guidance, and real strategy from start to close with your local real estate expert.",
  keywords: [
    "sell home Riverside CA",
    "Riverside real estate agent",
    "sell my house Riverside",
    "Riverside home selling",
    "real estate Riverside California",
    "list home Riverside",
  ],
  openGraph: {
    title: "RiversideHomes.co | Sell Your Riverside Home the Simple Way",
    description:
      "Find out what your Riverside home is worth and plan your next move. Simple process, clear guidance, and real strategy from start to close.",
    url: "https://www.riversidehomes.co",
    siteName: "RiversideHomes.co",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RiversideHomes.co — What's Your Next Move?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RiversideHomes.co | Sell Your Riverside Home the Simple Way",
    description:
      "Find out what your Riverside home is worth and plan your next move. Simple process, clear guidance, and real strategy from start to close.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.riversidehomes.co",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className={`${manrope.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
