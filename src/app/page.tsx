import { HeroSlider } from "@/components/HeroSlider";
import { NewsletterOptIn } from "@/components/NewsletterOptIn";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { PhilosophySlider } from "@/components/PhilosophySlider";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSlider />

      <PhilosophySlider />

      {/* Featured Works Teaser */}
      <section className="pb-32 px-4">
        <div className="max-w-[1400px] mx-auto text-center mb-20">
          <h2 className="text-sm tracking-[0.4em] text-primary mb-4 uppercase font-medium">
            Featured Stories
          </h2>
        </div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/portfolio"
            className="group relative aspect-4/5 overflow-hidden bg-secondary"
          >
            <Image
              src="/images/weddings/IMG_3923.webp"
              alt="White Weddings"
              fill
              priority
              loading="eager"
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-10 left-10">
              <h3 className="text-2xl text-white font-light tracking-widest uppercase">
                White Weddings
              </h3>
              <span className="text-white/60 text-xs tracking-[0.2em] uppercase mt-2 block">
                View Stories
              </span>
            </div>
          </Link>
          <Link
            href="/portfolio"
            className="group relative aspect-4/5 overflow-hidden bg-secondary md:mt-24"
          >
            <Image
              src="/images/weddings/wedding3.webp"
              alt="Traditional Marriages"
              fill
              priority
              loading="eager"
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-10 left-10">
              <h3 className="text-2xl text-white font-light tracking-widest uppercase">
                Traditional
              </h3>
              <span className="text-white/60 text-xs tracking-[0.2em] uppercase mt-2 block">
                View Stories
              </span>
            </div>
          </Link>
        </div>
      </section>

      <TestimonialSlider />

      <NewsletterOptIn />
    </main>
  );
}
