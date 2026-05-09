export function Footer() {
  return (
    <footer className="bg-[#212922] text-[#AEF6C7] py-20 px-6 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl tracking-[0.5em] font-light mb-8">
            WESLEYSHOTIT
          </h2>
          <p className="max-w-xs text-sm font-light leading-loose opacity-70">
            Documenting the beauty of love stories across Nigeria and beyond.
            Available for worldwide travel.
          </p>
        </div>

        <div>
          <h3 className="text-[10px] tracking-widest uppercase mb-6 opacity-40">
            Contact
          </h3>
          <ul className="space-y-4 text-sm font-light">
            <li>Wesleyshotproduction1@gmail.com</li>
            <li>+234 812 458 829</li>
            <li>Benin City, Edo State, Nigeria</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] tracking-widest uppercase mb-6 opacity-40">
            Social
          </h3>
          <ul className="space-y-4 text-sm font-light">
            <li>
              <a
                href="https://www.instagram.com/wesley_shot_wedding?igsh=MXl2ODZmdXJqMzMx"
                className="hover:opacity-100 transition-opacity"
              >
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-100 transition-opacity">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] tracking-widest uppercase opacity-40">
        <p>
          &copy; {new Date().getFullYear()} michealdev. All Rights Reserved.
        </p>
        <p>Made with love 💖</p>
      </div>
    </footer>
  );
}
