"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingBar } from "@/components/BookingBar";
import { StickyContactButtons } from "@/components/StickyContactButtons";
import { IS_MAINTENANCE_MODE } from "@/constants/maintenance";

export function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMaintenance = IS_MAINTENANCE_MODE || pathname === "/maintenance";

  if (isMaintenance) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <BookingBar />
      <StickyContactButtons />
      <Footer />
    </>
  );
}
