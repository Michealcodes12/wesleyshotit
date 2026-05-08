'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbox } from '@/components/Lightbox'

const highlights = [
  '/images/weddings/wedding3.webp',
  '/images/weddings/IMG_3923.webp',
  '/images/weddings/IMG_3522.webp',
  '/images/weddings/IMG_3926.webp',
  '/images/weddings/IMG_3507.webp',
  '/images/weddings/IMG_3047 (1).webp',
  '/images/weddings/IMG_3027.webp',
  '/images/weddings/IMG_3924.webp',
  '/images/weddings/IMG_3029.webp',
  '/images/weddings/IMG_3509.webp',
]

export default function HighlightGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <main className="pt-32 pb-24 px-4 bg-background min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-sm tracking-[0.5em] text-primary mb-4 uppercase font-medium">Highlight Gallery</h1>
          <p className="text-3xl md:text-5xl font-light tracking-tight text-foreground">A collection of standalone epic shots.</p>
        </header>

        {/* Masonry-like Grid using Tailwind Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {highlights.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i % 3 * 0.1 }}
              className="relative group cursor-pointer overflow-hidden bg-secondary"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Highlight ${i}`}
                width={800}
                height={1200}
                priority={i < 6}
                loading="eager"
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <Lightbox 
            image={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  )
}
