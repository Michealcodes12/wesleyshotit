"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const images = [
  "/images/weddings/wedding3.webp",
  "/images/weddings/IMG_3522.webp",
  "/images/weddings/IMG_3926.webp",
  "/images/weddings/IMG_3507.webp",
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt="Wedding Photography"
            fill
            priority={index === 0}
            loading="eager"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+ZNPQAIXwM4ghu36wAAAABJRU5ErkJggg=="
          />
          {/* Ken Burns effect simulation through motion scale */}
          <motion.div
            animate={{ scale: 1.1 }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/80" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 text-5xl font-light tracking-widest text-white md:text-7xl"
        >
          CAPTURING FOREVER
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-10 max-w-2xl text-lg font-light text-gray-200 md:text-xl"
        >
          Visual storytelling for the modern couple. Bespoke wedding photography
          in Benin City & beyond.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Link
            href="/booking"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-white text-black hover:bg-gray-200 transition-colors px-8 py-6 text-lg rounded-none h-auto",
            )}
          >
            Book Now!
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="h-10 w-1px bg-linear-to-b from-white/50 to-transparent" />
      </motion.div>
    </div>
  );
}
