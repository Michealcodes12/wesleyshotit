"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NewsletterOptIn } from "@/components/NewsletterOptIn";

export default function About() {
  return (
    <main className="pt-32 bg-background min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4">
        <header className="mb-20">
          <h1 className="text-sm tracking-[0.5em] text-primary mb-4 uppercase font-medium">
            About the Photographer
          </h1>
          <p className="text-3xl md:text-5xl font-light tracking-tight text-foreground max-w-2xl">
            Preserving moments with intention and art.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-[4/5] bg-secondary"
          >
            <Image
              src="/images/IMG_3915.webp"
              alt="Photographer Portrait"
              fill
              priority
              loading="eager"
              className="object-cover grayscale"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-light tracking-widest uppercase">
              The Philosophy
            </h2>
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                My name is Smith, and I started Wesleyshotit with a simple goal:
                to document love in its most honest form. Based in the heart of
                Benin City, I&apos;ve spent the last decade chasing light and
                stories across the continent.
              </p>
              <p>
                To me, wedding photography is more than just a gallery of
                photos; it&apos;s the first heirloom of a new family. It&apos;s
                about the deep breath before the &quot;I do,&quot; the laughter
                shared over palm wine, and the quiet moments that usually go
                unnoticed.
              </p>
              <p>
                My style is cinematic, editorial, and deeply rooted in
                authenticity. I don&apos;t just take pictures; I curate
                memories.
              </p>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-12 border-t border-border/10">
              <div>
                <h3 className="text-[10px] tracking-widest uppercase mb-2 opacity-50">
                  Experience
                </h3>
                <p className="text-lg font-light">10+ Years</p>
              </div>
              <div>
                <h3 className="text-[10px] tracking-widest uppercase mb-2 opacity-50">
                  Weddings
                </h3>
                <p className="text-lg font-light">250+ Stories</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <NewsletterOptIn />
    </main>
  );
}
