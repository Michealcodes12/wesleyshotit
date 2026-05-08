"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Osas & Ijeoma",
    message: "Smith didn't just take photos; he captured the soul of our wedding. Every time we look at our album, it feels like we're reliving the magic of that day in Benin City.",
  },
  {
    name: "Tunde & Sarah",
    message: "The cinematic quality of the highlights is breathtaking. He has an incredible eye for light and moments that most people miss. Pure artistry.",
  },
  {
    name: "Kelechi & Amaka",
    message: "Professional, punctual, and profoundly talented. The 'Modern Mint' aesthetic of the prints is exactly what we wanted for our home gallery.",
  },
];

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-primary overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-sm tracking-[0.4em] text-secondary mb-12 uppercase font-medium">
            Kind Words
          </h2>
          <div className="flex justify-center">
            <Quote className="text-secondary/20" size={40} />
          </div>
        </motion.div>

        <div className="relative h-[450px] md:h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="text-3xl md:text-5xl font-light leading-tight text-white italic mb-12 max-w-5xl">
                &quot;{testimonials[index].message}&quot;
              </p>
              <h3 className="text-xs tracking-[0.6em] uppercase text-secondary font-medium">
                — {testimonials[index].name}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 transition-all duration-500 ${
                i === index ? "w-12 bg-secondary" : "w-4 bg-secondary/10"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
