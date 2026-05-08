"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    id: "white",
    title: "White Weddings",
    image: "/images/weddings/IMG_3923.webp",
  },
  {
    id: "traditional",
    title: "Traditional",
    image: "/images/weddings/wedding3.webp",
  },
  {
    id: "engagement",
    title: "Engagements",
    image: "/images/weddings/IMG_3522.webp",
  },
];

export default function Portfolio() {
  return (
    <main className="pt-32 pb-24 px-4 bg-background min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-20">
          <h1 className="text-sm tracking-[0.5em] text-primary mb-4 uppercase font-medium">
            Portfolio
          </h1>
          <p className="text-3xl md:text-5xl font-light tracking-tight text-foreground max-w-2xl">
            Visual narratives of love, culture, and celebration.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/portfolio/${cat.id}`}
              className="group relative aspect-3/4 overflow-hidden bg-secondary"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                priority={i < 3}
                loading="eager"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <motion.h2
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-2xl text-white font-light tracking-widest uppercase mb-4"
                >
                  {cat.title}
                </motion.h2>
                <div className="h-1px w-0 group-hover:w-12 bg-white/50 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
