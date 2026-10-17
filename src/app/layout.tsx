import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});
const siteUrl =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Assignment 7",
  title: {
    default: "Assignment 7 | নিত্যপণ্যের আজকের বাজারদর",
    template: "%s | Assignment 7",
  },
  description:
    "বাংলাদেশের চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম, দুধ ও মসলার সর্বনিম্ন, সর্বাধিক এবং গড় বাজারদর এক জায়গায় দেখুন।",
  keywords: [
    "Assignment 7",
    "বাজার দর",
    "আজকের বাজারদর",
    "নিত্যপণ্যের দাম",
    "বাংলাদেশ বাজার মূল্য",
  ],
  publisher: "Assignment 7",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "/",
    siteName: "বাজার দর",
    title: "বাজার দর | নিত্যপণ্যের আজকের বাজারদর",
    description:
      "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সর্বনিম্ন, সর্বাধিক ও গড় বাজারদর এক নজরে দেখুন।",
    images: [
      {
        url: "/assets/bazar-hero.png",
        width: 430,
        height: 430,
        alt: "বাজার দর",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "বাজার দর | নিত্যপণ্যের আজকের বাজারদর",
    description:
      "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সর্বনিম্ন, সর্বাধিক ও গড় বাজারদর এক নজরে দেখুন।",
    images: ["/assets/bazar-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/assets/logo-icon.png",
    apple: "/assets/logo-icon.png",
  },
  category: "market prices",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#047c37",
  colorScheme: "light",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className={hind.variable}>
        <Providers>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
