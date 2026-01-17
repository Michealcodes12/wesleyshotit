import {
  PortfolioItem,
  ServicePackage,
  VideoItem,
} from "./typescript_interface";
import wedding1 from "../src/weddings/IMG_3522.webp";
import wedding2 from "../src/weddings/wedding3.webp";
import wedding3 from "../src/weddings/IMG_3027.webp";
import wedding4 from "../src/weddings/IMG_3029.webp";
import wedding5 from "../src/weddings/IMG_3507.webp";
import wedding6 from "../src/weddings/IMG_3509.webp";
import wedding7 from "../src/weddings/IMG_3923.webp";
import wedding8 from "../src/weddings/IMG_3924.webp";
import wedding9 from "../src/weddings/IMG_3926.webp";

import studio1 from "../src/studio/IMG_1617.webp";
import studio2 from "../src/studio/IMG_1950.webp";
import studio3 from "../src/studio/IMG_1998.webp";
import studio4 from  "../src/studio/IMG_2230.webp";
import studio5 from "../src/studio/IMG_2439.webp";
import studio6 from "../src/studio/IMG_2441.webp";
import studio7 from "../src/studio/IMG_2442.webp";
import studio8 from "../src/studio/studio1.webp";
import studio9 from "../src/studio/studio2.webp";


import outdoor1 from "../src/outdoor/IMG_3086.webp";
import outdoor2 from "../src/outdoor/outdoor1.webp";
import outdoor3 from "../src/outdoor/outdor3.webp";



export const HERO_IMAGES = [wedding1, wedding2, outdoor1, studio1];

export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: "v1",
    thumbnail:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", // Placeholder generic cinematic video
    title: "The Art of Light",
    category: "Documentary",
  },
  {
    id: "v2",
    thumbnail:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ", // Placeholder
    title: "Sarah & Mike",
    category: "Wedding Film",
  },
  {
    id: "v3",
    thumbnail:
      "https://images.unsplash.com/photo-1533518444388-7a8c8846336b?auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0", // Placeholder
    title: "Urban Rhythm",
    category: "Commercial",
  },
  {
    id: "v4",
    thumbnail:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?auto=format&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", // Placeholder
    title: "Neon Drift",
    category: "Music Video",
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "1",
    src: wedding1,
    category: "Wedding",
    title: "Eternal Vows",
    aspect: "landscape",
  },
  {
    id: "2",
    src: studio1,
    category: "Studio",
    title: "Urban Solitude",
    aspect: "portrait",
  },
  {
    id: "3",
    src: outdoor1,
    category: "Outdoor",
    title: "Neon Nights",
    aspect: "portrait",
  },
  {
    id: "4",
    src: wedding2,
    category: "Wedding",
    title: "First Dance",
    aspect: "landscape",
  },
 
  {
    id: "6",
    src: wedding3,
    category: "Wedding",
    title: "Vogue Street",
    aspect: "landscape",
  },
    {
      id: "7",
      src: wedding4,
      category: "Wedding",
      title: "Product Z",
      aspect: "landscape",
    },
    {
      id: "8",
      src: wedding5,
      category: "Wedding",
      title: "The Gaze1",
      aspect: "portrait",
    },
    {
      id: "9",
      src: wedding6,
      category: "Wedding",
      title: "The Gaze2",
      aspect: "portrait",
    },
    {
      id: "10",
      src: wedding7,
      category: "Wedding",
      title: "The Gaze3",
      aspect: "portrait",
    },
    {
      id: "11",
      src: wedding8,
      category: "Wedding",
      title: "The Gaze4",
      aspect: "portrait",
    },
   
    
    {
      id: "13",
      src: studio2,
      category: "Studio",
      title: "The Gaze6",
      aspect: "portrait",
    },
    {
      id: "14",
      src: studio3,
      category: "Studio",
      title: "The Gaze7",
      aspect: "portrait",
    },
    {
      id: "15",
      src: studio4,
      category: "Studio",
      title: "The Gaze8",
      aspect: "portrait",
    },
    {
      id: "16",
      src: studio5,
      category: "Studio",
      title: "The Gaze9",
      aspect: "landscape",
    },
    {
      id: "17",
      src: studio6,
      category: "Studio",
      title: "The Gaze10",
      aspect: "portrait",
    },
    {
      id: "18",
      src: studio7,
      category: "Studio",
      title: "The Gaze11",
      aspect: "portrait",
    },
    {
      id: "19",
      src: studio8,
      category: "Studio",
      title: "The Gaze12",
      aspect: "landscape",
    },
    {
      id: "20",
      src: studio9,
      category: "Studio",
      title: "The Gaze13",
      aspect: "portrait",
    },
    
    {
      id: "22",
      src: outdoor2,
      category: "Outdoor",
      title: "The Gaze14",
      aspect: "landscape",
    },
    {
      id: "23",
      src: outdoor3,
      category: "Outdoor",
      title: "The Gaze15",
      aspect: "portrait",
    },

     {
      id: "24",
      src: wedding9,
      category: "Wedding",
      title: "The Gaze18",
      aspect: "landscape",
    },
    

];

export const SERVICES: ServicePackage[] = [
  {
    id: "s1",
    title: "MINI PACKAGE",
    price: 449999,
    outsideprice: 499999,
    duration: "1 DAY",
    description: "Note that any location outside benin the price is  ",
    features: [
      'Normal Photobook (12 by 24 size)',
      "Photography",
      "Videography",
      "A Frame (12 by 16 size)",
      "100 Photos",
      "A minute video Highlight",
    ],
  },
  {
    id: "s2",
    title: "VIP PACKAGE",
    price: 799999,
    outsideprice: 846999,
    duration: "3 Days",
   description: "Note that any location outside benin the price is  ",
    features: [
      "Bridal shower",
      "Pre-wedding photos",
      "Photography",
      "Videography",
      "Content Creator",
      "Synthetic photobook (12 by 24 size)",
      "Customized calendar",
      "300 pictures",
      "Full HD  video in customized flash drive",
      "3 frames (12'16, 16'20 & 20'24)",
      "Drone service",
    ],
  },
  {
    id: "s3",
    title: "PREMIUM PACKAGE",
    price: 599999,
    outsideprice: 649999,
    duration: "2 Days",
    description: "Note that any location outside benin the price is  ",
    features: [
      "Normal Photobook (12 by 24 size)",
      "Videography",
      "Photography",
      "Customized calendar",
      "Content Creator",
      "2 frames (12'16 & 16'20)",
      "200 photos",
      "Full HD video in flash",
      "",
      
    ],
  },
];
