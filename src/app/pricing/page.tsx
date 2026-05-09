"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const packages = [
  {
    name: "Basic",
    price: "₦449,999",
    image: "/IMG_5791.JPG.webp",
    description: "OUTSIDE BENIN : ADDITIONAL 100K",
    features: [
      "1 DAY COVERAGE",
      "TRAD/WHITE COVERAGE",
      "NORMAL PHOTOBOOK (12'24 SIZE)",
      "PHOTOGRAPHY COVERAGE",
      "VIDEOGRAPHY COVERAGE",
      "A FRAME (16'20)",
      "A MINUTE HIGHLIGHT",
    ],
  },
  {
    name: "Vip_package",
    price: "1,349,999",
    image: "/IMG_5979.JPG.webp",
    description: "OUTSIDE BENIN : ADDITIONAL 100K",
    features: [
      "3 DAYS COVERAGE",
      "BRIDAL SHOWER",
      "PRE- WEDDING PHOTOS",
      "VIDEOGRAPHY COVERAGE",
      "PHOTOGRAPHY COVERAGE",
      "SYNTHETIC PHOTOBOOK (12/24 SIZE)",
      "TABLE FRAME",
      "300 PICTURES",
      "FULL HD VIDEO IN CUSTOMIZED FLASH DRIVE",
      "2 FRAMELESS (16/20 & 20/24)",
      "DRONE SERVICE",
    ],
    popular: true,
  },
  {
    name: "PREMIUM",
    price: "₦649,999",
    image: "/IMG_5792.JPG.webp",
    description: "OUTSIDE BENIN : ADDITIONAL 100K",
    features: [
      "2 DAYS COVERAGE",
      "NORMAL PHOTOBOOK (12'24 SIZE)",
      "PHOTOGRAPHY COVERAGE",
      "VIDEOGRAPHY COVERAGE",
      "200 PICTURES",
      "CUSTOMIZED CALENDAR",
      "CONTENT CREATOR",
      "FULL HD VIDEO IN CUSTOMIZED FLASH DRIVE",
      "2 FRAME (12'16 & 16'20)",
    ],
  },
];

export default function Pricing() {
  return (
    <main className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4">
        <header className="mb-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm tracking-[0.5em] text-primary mb-4 uppercase font-medium"
          >
            Investment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-light tracking-tight text-foreground max-w-3xl mx-auto"
          >
            Transparent pricing for timeless visual legacies.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={cn(
                "relative border border-border flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm",
                pkg.popular && "border-secondary shadow-2xl z-10 bg-card",
              )}
            >
              {pkg.popular && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-secondary text-primary text-[10px] tracking-[0.3em] uppercase px-4 py-2 font-bold z-20">
                  Most Popular
                </div>
              )}

              {/* Package hero image */}
              <div className="relative h-64 w-full overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pkg.image}
                  alt={`${pkg.name} wedding photography`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient fade into the card below */}
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent" />
              </div>

              {/* Card body */}
              <div className="p-10 flex flex-col grow">
                <div className="mb-10">
                  <h2 className="text-xs tracking-[0.4em] uppercase text-secondary mb-4 font-medium">
                    {pkg.name}
                  </h2>
                  <div className="text-4xl font-light tracking-tight mb-4 text-foreground">
                    {pkg.price}
                  </div>
                  <p className="text-muted-foreground text-sm font-light">
                    {pkg.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-12 grow">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm font-light text-foreground/80"
                    >
                      <Check className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/booking"
                  className={cn(
                    buttonVariants({
                      variant: pkg.popular ? "default" : "outline",
                    }),
                    "w-full h-14 rounded-none tracking-[0.2em] uppercase text-xs",
                    pkg.popular
                      ? "bg-secondary text-primary hover:bg-secondary/90"
                      : "border-secondary/30 text-white hover:bg-secondary/10",
                  )}
                >
                  Secure Date
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-20 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground text-sm font-light italic">
            * Custom packages available for destination weddings and multi-day
            celebrations. Contact us for a bespoke quote.
          </p>
        </footer>
      </div>
    </main>
  );
}
