import Image from "next/image";
import portfolio from "../../src/IMG_3915.webp"

export function AboutView() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src={portfolio}
              alt="Wesley Profile"
              width={500}
              height={500}
              className="w-full h-full object-cover grayscale-0 hover:grayscale transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-zinc-800 p-8 rounded-2xl border border-white/10 hidden md:block">
            <p className="font-bold text-4xl mb-1">10+</p>
            <p className="text-zinc-500 text-sm uppercase tracking-wider">
              Years Experience
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Behind the Lens
          </h2>
          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
            <p>
              Hi, I'm Wesley. I believe photography is more than just clicking a
              shutter; it's about freezing a feeling that would otherwise
              disappear forever.
            </p>
            <p>
              My style is rooted in cinema and raw emotion. Whether it's the
              nervous anticipation before a wedding ceremony or the structured
              chaos of a street fashion shoot, I look for the truth in every
              frame.
            </p>
            <p>
              When I'm not shooting, I'm likely scouting locations in downtown
              Lagos, drinking too much coffee, or editing late into the night to
              perfect your gallery.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-white mb-2">Philosophy</h4>
              <p className="text-sm text-zinc-500">
                Authenticity over perfection. Emotion over pose.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Gear</h4>
              <p className="text-sm text-zinc-500">
                Sony A7R V, 35mm GM, 85mm GM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
