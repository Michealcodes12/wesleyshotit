"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const packages = [
  {
    name: "Essential",
    price: "₦750,000",
    description: "Perfect for intimate weddings and short celebrations.",
    features: [
      "6 Hours of Coverage",
      "1 Professional Photographer",
      "300+ High-Res Edited Photos",
      "Online Private Gallery",
      "Delivery within 4 Weeks",
    ],
  },
  {
    name: "Premium",
    price: "₦1,250,000",
    description: "Our most popular package for a complete wedding day story.",
    features: [
      "10 Hours of Coverage",
      "2 Professional Photographers",
      "500+ High-Res Edited Photos",
      "12x12 Luxury Photo Book",
      "Pre-Wedding Session (2 hours)",
      "Online Private Gallery",
      "Delivery within 6 Weeks",
    ],
    popular: true,
  },
  {
    name: "Luxury",
    price: "₦2,500,000",
    description: "The ultimate heirloom experience for the modern couple.",
    features: [
      "Full Day Coverage (Unlimited)",
      "3 Professional Photographers",
      "800+ High-Res Edited Photos",
      "Premium Hand-Crafted Heirloom Album",
      "2 Parent Albums (Mini)",
      "Full Pre-Wedding Session + Video Teaser",
      "Priority 2-Week Delivery",
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={cn(
                "relative p-12 border border-border flex flex-col h-full bg-card/50 backdrop-blur-sm",
                pkg.popular && "border-secondary shadow-2xl z-10 bg-card"
              )}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-primary text-[10px] tracking-[0.3em] uppercase px-4 py-2 font-bold">
                  Most Popular
                </div>
              )}

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

              <ul className="space-y-4 mb-12 flex-grow">
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
                  buttonVariants({ variant: pkg.popular ? "default" : "outline" }),
                  "w-full h-14 rounded-none tracking-[0.2em] uppercase text-xs",
                  pkg.popular ? "bg-secondary text-primary hover:bg-secondary/90" : "border-secondary/30 text-white hover:bg-secondary/10"
                )}
              >
                Secure Date
              </Link>
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
