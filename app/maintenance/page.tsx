import type { Metadata } from "next";
import { MaintenancePage } from "@/components/MaintenancePage";

export const metadata: Metadata = {
  title: "Scheduled Maintenance | Lake Escape",
  description: "Lake Escape is currently undergoing scheduled maintenance. We will be back shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenanceRoute() {
  return <MaintenancePage />;
}
