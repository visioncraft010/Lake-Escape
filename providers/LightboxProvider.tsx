"use client";

import React, { createContext, useContext, useState } from "react";
import { MediaLightbox, LightboxItem } from "@/components/MediaLightbox";

interface LightboxContextType {
  openLightbox: (items: (LightboxItem | string)[], initialIndex?: number) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (mediaList: (LightboxItem | string)[], initialIndex = 0) => {
    const formattedItems: LightboxItem[] = mediaList.map((item) => {
      if (typeof item === "string") {
        const isVid = item.toLowerCase().endsWith(".mp4");
        return {
          src: item,
          type: isVid ? "video" : "image",
          title: isVid ? "Speedboat Adventure Excursion" : "Lake Escape Floating Sanctuary",
          category: isVid ? "Video" : "Stateroom"
        };
      }
      return item;
    });

    setItems(formattedItems);
    setCurrentIndex(initialIndex);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      <MediaLightbox
        isOpen={isOpen}
        items={items}
        currentIndex={currentIndex}
        onClose={closeLightbox}
        onIndexChange={setCurrentIndex}
      />
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return context;
}
