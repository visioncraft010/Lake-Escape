import type { Metadata } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://lakeescape.in"),
  title: {
    default: "Lake Escape | Floating Luxury on Tehri Lake",
    template: "%s | Lake Escape"
  },
  description: "A cinematic floating luxury hotel on Tehri Lake, Uttarakhand. Four premium staterooms, whole boat hire, private dining, sunset cruises, and curated mountain experiences.",
  openGraph: {
    title: "Lake Escape | Floating Luxury on Tehri Lake",
    description: "A cinematic floating luxury hotel on Tehri Lake, Uttarakhand.",
    images: ["/media/lake-escape-boat-1.png"]
  },
  twitter: {
    card: "summary_large_image"
  }
};

import { LightboxProvider } from "@/providers/LightboxProvider";
import { SiteLayoutWrapper } from "@/components/SiteLayoutWrapper";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-white text-[#1A0F0A]" suppressHydrationWarning>
        <LightboxProvider>
          <MotionProvider />
          <SiteLayoutWrapper>
            {children}
          </SiteLayoutWrapper>
        </LightboxProvider>
      </body>
    </html>
  );
}
