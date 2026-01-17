import {
  BookingFormData,
  PortfolioItem,
  ServicePackage,
  VideoItem,
} from "./typescript_interface";
import { useEffect, useState } from "react";
import {
  Camera,
  Menu,
  X,
  Instagram,
  Twitter,
  Mail,
  Calendar,
  Clock,
  Check,
  MapPin,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Loader2,
  ZoomIn,
  Play,
  Film,
  ExternalLink,
} from "lucide-react";
import { supabase } from "../superbase/config";
import Image from "next/image";

export const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) => {
  const baseStyle =
    "px-6 py-3 rounded-full font-medium transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    outline: "border border-white/20 text-white hover:bg-white/10",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const SectionHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-12 text-center">
    {subtitle && (
      <span className="text-zinc-500 uppercase tracking-widest text-sm font-semibold mb-2 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
      {title}
    </h2>
    <div className="h-1 w-20 bg-white/20 mx-auto mt-6 rounded-full" />
  </div>
);

export const Lightbox = ({
  item,
  onClose,
}: {
  item: PortfolioItem | null;
  onClose: () => void;
}) => {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
        <X className="w-8 h-8" />
      </button>
      <Image
        src={item.src as string}
        alt={item.title}
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      />
      <div
        className="absolute bottom-6 left-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold">{item.title}</h3>
        <p className="text-zinc-400">{item.category}</p>
      </div>
    </div>
  );
};

export const VideoLightbox = ({
  item,
  onClose,
}: {
  item: VideoItem | null;
  onClose: () => void;
}) => {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button className="absolute top-6 right-6 z-10 text-white/50 hover:text-white transition-colors">
        <X className="w-8 h-8" />
      </button>
      <div className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
        <iframe
          src={`${item.videoUrl}?autoplay=1`}
          title={item.title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div
        className="absolute bottom-6 left-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold">{item.title}</h3>
        <p className="text-zinc-400">{item.category}</p>
      </div>
    </div>
  );
};

export const AvailabilityCalendar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    // Fetch bookings directly from public collection
    const fetchAvaliability = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("bookings").select("date");

      if (error) {
        console.error("Error fetching availability:", error.message);
      }
      if (data) {
        // 2. Transform the data
        // Supabase returns: [{ shoot_date: "2023-12-25" }, { shoot_date: "2023-12-31" }]
        // We map it to: ["2023-12-25", "2023-12-31"]
        const dates = data.map((item: any) => item.date);
        console.log(dates);

        setBookedDates(dates);
      }

      setIsLoading(false);
    };
    fetchAvaliability();
  }, [isOpen]);

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const isBooked = (day: number) => {
    // Construct YYYY-MM-DD
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    return bookedDates.includes(dateStr);
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl relative animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Availability
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Month Nav */}
        <div className="flex items-center justify-between mb-6 px-2">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-300" />
          </button>
          <div className="font-bold text-lg text-white">
            {monthNames[month]} {year}
          </div>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-zinc-300" />
          </button>
        </div>

        {/* Calendar Grid */}
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-bold text-zinc-500 py-2"
              >
                {day}
              </div>
            ))}

            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const booked = isBooked(day);
              return (
                <div
                  key={day}
                  className={`
                             aspect-square rounded-lg flex items-center justify-center text-sm font-medium relative overflow-hidden transition-all
                             ${
                               booked
                                 ? "bg-red-500/20 text-red-500 border border-red-500/30"
                                 : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5"
                             }
                          `}
                >
                  {day}
                  {booked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <X
                        className="w-8 h-8 text-red-500/50"
                        strokeWidth={1.5}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-white/5 border border-white/5"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/30"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const generateGoogleCalendarUrl = (
  formData: BookingFormData,
  service: ServicePackage
) => {
  // Parse date and time
  const startDateTime = new Date(`${formData.date}T${formData.time}`);

  // Parse duration (e.g., "1 Hour", "8 Hours")
  const durationHours = parseInt(service.duration.split(" ")[0]) || 1;
  const endDateTime = new Date(
    startDateTime.getTime() + durationHours * 60 * 60 * 1000
  );

  // Format for Google Calendar (YYYYMMDDTHHMMSSZ)
  // We remove punctuation and milliseconds
  const formatTime = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Photoshoot: ${service.title} - ${formData.clientName}`,
    dates: `${formatTime(startDateTime)}/${formatTime(endDateTime)}`,
    details: `Booking Details:\nService: ${service.title}\nClient: ${formData.clientName}\nEmail: ${formData.clientEmail}\nLocation: ${formData.location}\nNotes: ${formData.message}`,
    location: formData.location,
    sprop: "website:wesleyshot.com",
    sprop_name: "Wesleyshot",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const resolveImage = (image: any): string => {
  if (!image) return "";
  if (typeof image === "string") return image;
  // Handle Next.js import object (which has a .src property)
  if (typeof image === "object" && image.src) return image.src;
  return "";
};




export const formatForZoho = (dateStr: string, timeStr: string): string => {
  if (!dateStr || !timeStr) return "";
  
  const date = new Date(dateStr);
  
  // Ensure we get the correct day/month even with timezone differences
  // Using UTC methods or manually creating the date object avoids off-by-one errors
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }); 
  const year = date.getUTCFullYear();
  
  return `${day}-${month}-${year} ${timeStr}:00`;
};
