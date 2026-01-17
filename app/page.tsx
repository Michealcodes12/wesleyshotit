"use client";
import { useState, useEffect } from "react";
import { Camera, Menu, X } from "lucide-react";
import { HomeView } from "./component/views/HomeView";
import { Button } from "./utils/helper_function";
import { ServicesView } from "./component/views/Service";
import { BookingView } from "./component/views/BookingView";
import { ContactView } from "./component/views/Contact";
import { PortfolioView } from "./component/views/Portfolio";
import { Footer } from "./component/Footer";
import { supabase } from "./superbase/config";
import { AboutView } from "./component/views/About";

// --- Type Definitions ---

// --- Main Application ---
export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Initialize client
  const [user, setUser] = useState<any>(null);
  // Auth Effect
  useEffect(() => {
    const initAuth = async () => {
      // Check if user is already logged in
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        console.log("User already signed in:");
        setUser(session.user);
      } else {
        // Sign in anonymously
        const { data, error } = await supabase.auth.signInAnonymously();

        if (error) {
          console.error("Error signing in anonymously:", error.message);
        } else {
          // console.log("Signed in anonymously:");
          setUser(data.user);
        }
      }

    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);


  // Navigation Logic
  const navigateTo = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };




  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-white/20 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-2 font-bold text-2xl tracking-tighter cursor-pointer"
            onClick={() => navigateTo("home")}
          >
            <Camera className="w-6 h-6" />
            <span>WESLEYSHOT</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            {["Portfolio", "Services", "About", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => navigateTo(item.toLowerCase() as any)}
                className={`hover:text-white transition-colors ${
                  activeTab === item.toLowerCase() ? "text-white" : ""
                }`}
              >
                {item}
              </button>
            ))}
            <Button
              variant="primary"
              className="px-5 py-2 text-sm"
              onClick={() => navigateTo("booking")}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-zinc-900 border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
            {["Home", "Portfolio", "Services", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => navigateTo(item.toLowerCase() as any)}
                className="text-left text-lg font-medium py-2 border-b border-white/5"
              >
                {item}
              </button>
            ))}
            <Button
              variant="primary"
              className="w-full mt-4"
              onClick={() => navigateTo("booking")}
            >
              Book Appointment
            </Button>
          </div>
        )}
      </nav>

      {/* Main Content Router */}
      <main className="pt-20">
        {activeTab === "home" && <HomeView navigateTo={navigateTo} />}
        {activeTab === "portfolio" && <PortfolioView />}
        {activeTab === "services" && <ServicesView navigateTo={navigateTo} />}
        {activeTab === "booking" && <BookingView navigateTo={navigateTo} user={user} />}
        {activeTab === "contact" && <ContactView />}
        {activeTab === "about" && <AboutView />}
      </main>

      {/* Footer */}
      <Footer navigateTo={navigateTo} />
    </div>
  );
}

// --- View Components ---

// ... existing PortfolioView, ServicesView, AboutView ...
