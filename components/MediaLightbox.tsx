"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Maximize2, Sparkles, Film } from "lucide-react";

export interface LightboxItem {
  src: string;
  title?: string;
  category?: string;
  description?: string;
  type?: "image" | "video";
}

interface MediaLightboxProps {
  isOpen: boolean;
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function MediaLightbox({
  isOpen,
  items,
  currentIndex,
  onClose,
  onIndexChange
}: MediaLightboxProps) {
  const currentItem = items[currentIndex] || items[0];

  const handlePrev = useCallback(() => {
    onIndexChange(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  }, [currentIndex, items.length, onIndexChange]);

  const handleNext = useCallback(() => {
    onIndexChange(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, items.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !currentItem) return null;

  const isVideo = currentItem.type === "video" || currentItem.src.toLowerCase().endsWith(".mp4");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[999] flex flex-col justify-between bg-black/95 text-white backdrop-blur-xl p-3 sm:p-6"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between z-20 pb-3">
          <div className="flex items-center gap-3">
            {currentItem.category && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-bold uppercase tracking-wider border border-white/15 backdrop-blur-xs">
                {currentItem.category}
              </span>
            )}
            <span className="text-xs text-white/70 font-mono">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition backdrop-blur-md cursor-pointer border border-white/15"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Center Media Showcase */}
        <div className="relative flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-auto overflow-hidden">
          
          {/* Previous Arrow Button */}
          {items.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20 backdrop-blur-md cursor-pointer hover:scale-105"
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Media Container */}
          <div className="relative w-full h-full max-h-[72vh] flex items-center justify-center">
            {isVideo ? (
              <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/15">
                <video
                  key={currentItem.src}
                  src={currentItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <motion.div
                key={currentItem.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full max-h-[72vh]"
              >
                <Image
                  src={currentItem.src}
                  alt={currentItem.title || "Lake Escape Media"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  priority
                />
              </motion.div>
            )}
          </div>

          {/* Next Arrow Button */}
          {items.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20 backdrop-blur-md cursor-pointer hover:scale-105"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
          )}

        </div>

        {/* Bottom Filmstrip & Caption */}
        <div className="z-20 pt-3 max-w-5xl mx-auto w-full">
          {currentItem.title && (
            <div className="text-center mb-2">
              <h4 className="font-serif italic text-base sm:text-lg text-white font-normal">
                {currentItem.title}
              </h4>
              {currentItem.description && (
                <p className="text-xs text-white/70 max-w-xl mx-auto font-sans mt-0.5">
                  {currentItem.description}
                </p>
              )}
            </div>
          )}

          {/* Thumbnail Filmstrip */}
          {items.length > 1 && (
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar px-2 max-w-full">
              {items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onIndexChange(idx)}
                  className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 transition-all border ${
                    idx === currentIndex
                      ? "ring-2 ring-white border-white scale-105"
                      : "opacity-40 hover:opacity-80 border-white/20"
                  }`}
                >
                  {item.type === "video" || item.src.toLowerCase().endsWith(".mp4") ? (
                    <div className="w-full h-full bg-[#2C1A10] flex items-center justify-center text-white">
                      <Film size={14} />
                    </div>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.title || "Thumbnail"}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
