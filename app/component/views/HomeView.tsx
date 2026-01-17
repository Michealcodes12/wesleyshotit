import r from "../../src/weddings/wedding3.webp";
import {
  AvailabilityCalendar,
  Button,
  Lightbox,
  resolveImage,
  VideoLightbox,
} from "../../utils/helper_function";
import { HERO_IMAGES, PORTFOLIO_ITEMS, VIDEO_ITEMS } from "../../utils/Data";
import { PortfolioItem, VideoItem } from "@/app/utils/typescript_interface";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Play,
  Film,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function HomeView({ navigateTo }: { navigateTo: (tab: any) => void }) {
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(
    null
  );
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Carousel Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const scrollToVideo = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.children;
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
        setCurrentVideoIndex(index);
      }
    }
  };

  const nextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % VIDEO_ITEMS.length;
    scrollToVideo(nextIndex);
  };

  const prevVideo = () => {
    const prevIndex =
      (currentVideoIndex - 1 + VIDEO_ITEMS.length) % VIDEO_ITEMS.length;
    scrollToVideo(prevIndex);
  };

  return (
    <>
      {/* Hero Section - Carousel */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Carousel Images */}
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute  inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentHeroIndex ? "opacity-50" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={`Hero Background ${index + 1}`}
              placeholder="blur"
              className="w-full aspect-square  object-cover  animate-in  duration-10000ms"
            />
          </div>
        ))}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto animate-in fade-in zoom-in duration-1000">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-tight">
            CAPTURING THE
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500">
              UNSEEN
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-10 max-w-2xl mx-auto font-light">
            Professional photography & cinematography for those who value
            authenticity.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigateTo("booking")}
              className="min-w-180px"
            >
              Book Appointment
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsCalendarOpen(true)}
              className="min-w-180px"
            >
              View Availability
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500 z-20">
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Portfolio Preview */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">Latest Works</h2>
              <p className="text-zinc-400 mt-2">
                A glimpse into recent stories told.
              </p>
            </div>
            <button
              onClick={() => navigateTo("portfolio")}
              className="hidden md:flex items-center gap-2 text-white hover:text-zinc-300 transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_ITEMS.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="group relative aspect-4/5 overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  // @ts-ignore
                  src={item.src.src}
                  alt={item.title}
                  
                  className=" object-cover w-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center flex-col p-6 text-center">
                  <span className="text-xs font-bold tracking-widest uppercase text-zinc-300 mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematography Section (Updated Layout) */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Slider Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/5 pb-8">
            <div className="text-center md:text-left w-full md:w-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
                <Film className="w-8 h-8 md:w-10 md:h-10 text-white" />
                Motion & Cinema
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto md:mx-0">
                Beyond still images, we craft cinematic narratives that move,
                breathe, and inspire.
              </p>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-4 mx-auto md:mx-0">
              <button
                onClick={prevVideo}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-95"
                aria-label="Previous Video"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="text-sm font-mono text-zinc-500 w-16 text-center">
                {currentVideoIndex + 1} / {VIDEO_ITEMS.length}
              </div>
              <button
                onClick={nextVideo}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-95"
                aria-label="Next Video"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Video Carousel - Centered Snap with Peek */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {VIDEO_ITEMS.map((video, index) => (
              <div
                key={video.id}
                className="snap-center shrink-0 w-[85%] md:w-[60%] aspect-video relative rounded-xl overflow-hidden cursor-pointer group border border-white/5 shadow-2xl transition-all duration-500"
                onClick={() => setSelectedVideo(video)}
              >
                {/* Background Image */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-500"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  {/* Play Button */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20 mb-4 shadow-lg">
                    <Play
                      className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
                      fill="currentColor"
                    />
                  </div>

                  {/* Text */}
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-2">
                      {video.category}
                    </p>
                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-2">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Client Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/50 p-8 rounded-2xl border border-white/5 text-left">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-zinc-300 mb-6 italic">
                "Wesley has an incredible eye. The photos from our wedding
                weren't just images, they were feelings captured in time.
                Absolutely breathtaking."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-700 rounded-full" />
                <div>
                  <div className="font-bold">Sarah & James</div>
                  <div className="text-xs text-zinc-500">Wedding Clients</div>
                </div>
              </div>
            </div>
            <div className="bg-black/50 p-8 rounded-2xl border border-white/5 text-left">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-zinc-300 mb-6 italic">
                "Professional, punctual, and incredibly talented. The editorial
                shots for our brand launch were exactly what we needed."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-700 rounded-full" />
                <div>
                  <div className="font-bold">Marcus Chen</div>
                  <div className="text-xs text-zinc-500">Fashion Director</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightboxes */}
      <Lightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
      <VideoLightbox
        item={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
      <AvailabilityCalendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </>
  );
}
