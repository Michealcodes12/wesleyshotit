"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pillars = [
  {
    title: "Authenticity",
    description: "No forced poses. Just the raw, beautiful emotion of your celebration. We capture you exactly as you are.",
  },
  {
    title: "Artistry",
    description: "Every frame is composed with an editorial eye for light and depth. We turn moments into masterpieces.",
  },
  {
    title: "Legacy",
    description: "High-end prints and albums designed to be passed down for generations. Your first family heirloom.",
  },
];

export function PhilosophySlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % pillars.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 px-4 bg-background text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-sm tracking-[0.4em] text-primary mb-16 uppercase font-medium">
          Our Philosophy
        </h2>

        <div className="relative h-[300px] md:h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <h3 className="text-4xl md:text-6xl font-light tracking-widest uppercase mb-8 text-foreground">
                {pillars[index].title}
              </h3>
              <p className="text-lg md:text-xl font-light leading-relaxed text-muted-foreground max-w-2xl">
                {pillars[index].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-20">
          {pillars.map((pillar, i) => (
            <button
              key={pillar.title}
              onClick={() => setIndex(i)}
              className="group relative py-2"
            >
              <span
                className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-500 ${
                  i === index ? "text-primary opacity-100" : "text-foreground opacity-30 hover:opacity-100"
                }`}
              >
                {pillar.title}
              </span>
              {i === index && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
