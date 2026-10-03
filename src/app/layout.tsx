import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Ideal Solutions | Kerala's Leading Roofing & PEB Contractor",
  description: "Authorized Kerala contractor for CertainTeed Saint-Gobain shingles, TechnoNicol stone coated tiles, PEB steel buildings, truss fabrication, and gypsum false ceilings. 18+ years experience, 1500+ completed projects.",
  keywords: [
    "Roofing Shingles Kerala",
    "CertainTeed Shingles Trivandrum",
    "PEB Contractors Kochi",
    "Stone Coated Metal Tiles Kerala",
    "Truss Work Trivandrum Ernakulam",
    "False Ceiling Saint-Gobain Kerala",
    "Oralium Roofing Sheet Kerala",
    "Ideal Solutions Kerala",
    "Architectural Roofing Kerala",
    "TechnoNicol Waterproofing Kerala"
  ],
  openGraph: {
    title: "Ideal Solutions | Premium Architectural Roofing & PEB Engineering",
    description: "Kerala's premier roofing and structural engineering contractor. 1500+ completed projects, 30-50 year warranty, authorized CertainTeed & TechnoNicol applicator.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RoofingContractor",
              "name": "Ideal Solutions",
              "description": "Premium Architectural Roofing, PEB Structural Engineering, and Turnkey Contracting in Kerala",
              "telephone": "+919567242157",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "SRA-09, PTP Nagar, Thirumala-PO",
                "addressLocality": "Trivandrum",
                "addressRegion": "Kerala",
                "postalCode": "695006",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "8.5066",
                "longitude": "76.9856"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "19:00"
              },
              "priceRange": "₹₹"
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
