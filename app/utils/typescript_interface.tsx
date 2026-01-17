import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";

export type Category =
  | "All"
  | "Wedding"
  | "Outdoor"
  | "Studio"


export interface PortfolioItem {
  id: string;
  src: String | StaticImageData | StaticImport;
  category: Category;
  title: string;
  aspect: "portrait" | "landscape";
}

export interface VideoItem {
  id: string;
  thumbnail: string;
  videoUrl: string; // Embed URL
  title: string;
  category: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  price: number;
  outsideprice: number;
  duration: string;
  description: string;
  features: string[];
}

export interface BookingFormData {
  clientName: string;
  clientEmail: string;
  service: string;
  date: string;
  time: string;
  location: string;
  message: string;
  event_type: string;
}

export interface BookingRecord extends BookingFormData {
  id: string;
  status: "pending" | "confirmed" | "completed";
  createdAt: any;
}

export interface EmailPreview {
  to: string;
  subject: string;
  body: string;
}
