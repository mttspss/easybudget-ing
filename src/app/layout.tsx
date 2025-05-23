import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "easybudget.ing - Smart Budget Management",
  description: "Take control of your finances with easybudget.ing, the all-in-one solution for tracking expenses, creating budgets, and achieving your financial goals.",
  keywords: ["budget", "finance", "money management", "expense tracker", "financial planning", "savings", "financial goals"],
  authors: [{ name: "easybudget.ing Team" }],
  creator: "easybudget.ing",
  publisher: "easybudget.ing",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://easybudget.ing"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://easybudget.ing/",
    siteName: "easybudget.ing",
    title: "easybudget.ing - Smart Budget Management",
    description: "Take control of your finances with easybudget.ing, the all-in-one solution for tracking expenses, creating budgets, and achieving your financial goals.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "easybudget.ing - Smart Budget Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "easybudget.ing - Smart Budget Management",
    description: "Take control of your finances with easybudget.ing, the all-in-one solution for tracking expenses, creating budgets, and achieving your financial goals.",
    images: ["/images/twitter-image.jpg"],
    creator: "@easybudgeting",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link 
          rel="preload" 
          href="/images/icon.png" 
          as="image" 
          type="image/png"
        />
        {/* DNS Prefetch and Preconnect */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
        {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
