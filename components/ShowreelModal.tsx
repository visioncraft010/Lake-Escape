"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { media } from "@/lib/data";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  // Lock body scroll when showreel is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-matte-black/95 p-4 md:p-10"
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

          {/* Close button */}
          <button
            className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20 hover:scale-105"
            onClick={onClose}
            aria-label="Close video"
          >
            <X size={20} />
          </button>

          {/* Video Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="relative z-10 aspect-video w-full max-w-6xl overflow-hidden rounded-[8px] border border-cream/10 bg-black shadow-2xl"
          >
            <video
              className="h-full w-full object-cover"
              src={media.heroVideoDesktop}
              autoPlay
              controls
              playsInline
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
