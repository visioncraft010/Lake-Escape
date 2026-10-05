import { Hero } from "@/components/Hero";
import { HomeRooms } from "@/components/HomeRooms";
import { HomeSplitExperience } from "@/components/HomeSplitExperience";
import { HomeAmenities } from "@/components/HomeAmenities";
import { HomeCharter } from "@/components/HomeCharter";
import { HomeDining } from "@/components/HomeDining";
import { HomeEditorialQuote } from "@/components/HomeEditorialQuote";

export default function HomePage() {
  return (
    <main className="lake-home min-h-screen bg-[#FBF9F5] text-[#1A0F0A]">
      <Hero />
      <HomeRooms />
      <HomeSplitExperience />
      <HomeAmenities />
      <HomeCharter />
      <HomeDining />
      <HomeEditorialQuote />
    </main>
  );
}
