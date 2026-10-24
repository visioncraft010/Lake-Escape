export interface BentoImageItem {
  src: string;
  alt: string;
  caption: string;
  aspect: string;
  position: string; // CSS position classes for asymmetrical layout
}

export interface RoomShowcaseItem {
  id: string;
  tag: string;
  subtitle: string;
  primaryImage: string;
  primaryAlt: string;
  bentoImages: BentoImageItem[];
}

export const roomShowcaseData: RoomShowcaseItem[] = [
  {
    id: "01",
    tag: "ROOM 01",
    subtitle: "LAKEFRONT CABIN",
    primaryImage: "/images/rooms/room-1/Room - interior - 1.JPG",
    primaryAlt: "Lake Escape Room 01 Main Suite Interior",
    bentoImages: [
      {
        src: "/images/rooms/room-1/Balcony - 1.JPG",
        alt: "Private Lakefront Balcony",
        caption: "PRIVATE LAKE BALCONY",
        aspect: "aspect-[4/5]",
        position: "-top-10 -left-4 md:-left-20 w-44 sm:w-56 md:w-72 z-20",
      },
      {
        src: "/images/rooms/room-1/Room - interior - 2.JPG",
        alt: "Cedar Interior Seating Detail",
        caption: "CEDAR WOOD INTERIOR",
        aspect: "aspect-square",
        position: "top-1/3 -right-4 md:-right-24 w-48 sm:w-60 md:w-80 z-20",
      },
      {
        src: "/images/rooms/room-1/Washroom -1.JPG",
        alt: "Ensuite Bathroom Detail",
        caption: "EN SUITE SANCTUARY",
        aspect: "aspect-[3/4]",
        position: "-bottom-12 left-10 md:left-24 w-36 sm:w-48 md:w-60 z-20",
      },
    ],
  },
  {
    id: "02",
    tag: "ROOM 02",
    subtitle: "SUNSET VISTA CABIN",
    primaryImage: "/images/rooms/room-2/Room 2 Interior - 1.JPG",
    primaryAlt: "Lake Escape Room 02 Sunset Vista Interior",
    bentoImages: [
      {
        src: "/images/rooms/room-2/Room 2 Balcony - 1.JPG",
        alt: "Sun Deck Horizon View",
        caption: "SUNKEN DECK VERANDA",
        aspect: "aspect-[16/10]",
        position: "-top-8 -right-4 md:-right-24 w-48 sm:w-64 md:w-84 z-20",
      },
      {
        src: "/images/rooms/room-2/Room 2 Interior - 2.JPG",
        alt: "Panoramic Bedside View",
        caption: "PANORAMIC BED LOUNGE",
        aspect: "aspect-square",
        position: "bottom-1/4 -left-4 md:-left-20 w-40 sm:w-52 md:w-68 z-20",
      },
      {
        src: "/images/rooms/room-2/Room 2 Washroom - 1.JPG",
        alt: "Ensuite Rain Shower",
        caption: "RAINSHOWER NOOK",
        aspect: "aspect-[3/4]",
        position: "-bottom-14 right-12 md:right-32 w-36 sm:w-44 md:w-56 z-20",
      },
    ],
  },
  {
    id: "03",
    tag: "ROOM 03",
    subtitle: "AZURE DECK CABIN",
    primaryImage: "/images/rooms/room-3/Room3 Interior - 1.JPG",
    primaryAlt: "Lake Escape Room 03 Azure Deck Interior",
    bentoImages: [
      {
        src: "/images/rooms/room-3/Room3 Balcony - 1.JPG",
        alt: "Infinity Water Deck",
        caption: "INFINITY WATER DECK",
        aspect: "aspect-[4/5]",
        position: "-top-12 -left-4 md:-left-16 w-44 sm:w-56 md:w-72 z-20",
      },
      {
        src: "/images/rooms/room-3/Room3 Interior - 2.JPG",
        alt: "Floating Lounge Space",
        caption: "MINIMALIST LOUNGE NOOK",
        aspect: "aspect-[16/10]",
        position: "bottom-1/3 -right-4 md:-right-20 w-52 sm:w-68 md:w-84 z-20",
      },
      {
        src: "/images/rooms/room-3/Room3 Washroom - 1.JPG",
        alt: "Stone Vanity Detail",
        caption: "MARBLE VANITY",
        aspect: "aspect-square",
        position: "-bottom-12 left-16 md:left-36 w-32 sm:w-40 md:w-52 z-20",
      },
    ],
  },
  {
    id: "04",
    tag: "SUITE 04",
    subtitle: "PRESIDENTIAL LAKE SUITE",
    primaryImage: "/images/rooms/suite-room/Suite Room Interior - 1.JPG",
    primaryAlt: "Lake Escape Signature Suite Interior",
    bentoImages: [
      {
        src: "/images/rooms/suite-room/balcony-1.jpg",
        alt: "360 Panoramic Deck",
        caption: "360° PRIVATE LAKE TERRACE",
        aspect: "aspect-[16/9]",
        position: "-top-8 -right-4 md:-right-28 w-56 sm:w-72 md:w-96 z-20",
      },
      {
        src: "/images/rooms/suite-room/interior-2.jpg",
        alt: "Grand Suite Salon",
        caption: "EXECUTIVE SALON LOUNGE",
        aspect: "aspect-[4/5]",
        position: "bottom-1/4 -left-4 md:-left-24 w-48 sm:w-60 md:w-76 z-20",
      },
      {
        src: "/images/rooms/suite-room/washroom-1.jpg",
        alt: "Panoramic Tub View",
        caption: "PANORAMIC SOAKING TUB",
        aspect: "aspect-square",
        position: "-bottom-16 right-16 md:right-40 w-40 sm:w-52 md:w-64 z-20",
      },
    ],
  },
];
