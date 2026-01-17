import { Apple, Camera, Instagram, Mail, Twitter } from "lucide-react";

export function Footer({ navigateTo }: any) {
  return (
    <footer className="bg-zinc-900 border-t border-white/10 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold tracking-tighter mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5" /> WESLEYSHOT
          </h3>
          <p className="text-zinc-400 max-w-sm leading-relaxed">
            Capturing life's most fleeting moments with precision, artistry, and
            soul. Based in Lagos, available worldwide.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-zinc-400">
            <li>
              <button
                onClick={() => navigateTo("portfolio")}
                className="hover:text-white"
              >
                Portfolio
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("services")}
                className="hover:text-white"
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("booking")}
                className="hover:text-white"
              >
                Book Online
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Connect</h4>
          <div className="flex gap-4">
            <a
            target="_blank"
              href="https://www.instagram.com/wesley_shot_wedding?igsh=MThzdzNnZm9mNzJhNg=="
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} Wesleyshot Photography. All rights
        reserved.
      </div>
    </footer>
  );
}
