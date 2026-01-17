import { Lightbox } from "@/app/utils/helper_function";
import { PORTFOLIO_ITEMS } from "@/app/utils/Data";
import { Category, PortfolioItem } from "@/app/utils/typescript_interface";
import { ZoomIn } from "lucide-react";
import { useMemo, useState } from "react";
import Image from "next/image";

export function PortfolioView() {
  const [filter, setFilter] = useState<Category>("All");
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(
    null
  );

  const filteredItems = useMemo(() => {
    return filter === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-zinc-900 py-24 px-6 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Visual Stories
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            A curated collection of moments, emotions, and light.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["All", "Wedding", "Studio", "Outdoor"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as Category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-white text-black"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Masonry-ish Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <Image
                  // @ts-ignore
                src={item.src.src}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={700}
                height={700}
            
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <div className="ml-auto bg-white/20 p-2 rounded-full backdrop-blur-sm">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
