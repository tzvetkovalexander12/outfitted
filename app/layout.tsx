import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitAround | AI Outfit Matching",
  description:
    "Upload one clothing item and get outfit recommendations styled around your occasion, fit, and budget.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "FitAround | AI Outfit Matching",
    description: "Upload one item and get the rest of the outfit styled around it.",
    url: "https://outfittedmvp.vercel.app",
    siteName: "FitAround",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitAround | AI Outfit Matching",
    description: "Upload one item and get the rest of the outfit styled around it.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        {/* Skimlinks Script */}
        <script
          type="text/javascript"
          src="https://s.skimresources.com/js/302284X1790278.skimlinks.js"
        ></script>
      </body>
    </html>
  );
}
