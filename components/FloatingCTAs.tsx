"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function FloatingCTAs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:bottom-8 md:right-8"
        >
          {/* WhatsApp Concierge Button */}
          <a
            href="https://wa.me/919762985044?text=Hi%20Lake%20Escape,%20I%20would%20like%20to%20enquire%20about%20booking%20a%20stay."
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-108 hover:bg-[#20ba5a] transition duration-300"
            title="Chat with Concierge"
          >
            <MessageSquare size={20} className="fill-current" />
          </a>

          {/* Book Your Stay Button */}
          <Link
            href="/booking"
            className="flex h-12 items-center gap-2 rounded-full bg-olive px-6 text-cream shadow-lg hover:scale-105 hover:bg-olive-dark transition duration-300 font-poppins text-[10px] font-bold uppercase tracking-wider"
          >
            <Calendar size={14} />
            <span>Book Stay</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
