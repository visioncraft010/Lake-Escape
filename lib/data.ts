import { Bike, Sparkles, Sun, Utensils } from "lucide-react";

export const media = {
  heroVideoDesktop: "/media/hero-desktop-compressed.mp4",
  heroVideoMobile: "/media/hero-mobile-compressed.mp4",
  heroVideoFallback: "/media/header-video-1.mp4",
  speedboatVideo: "/media/speedboat-adventure.mp4",
  boatOne: "/images/rooms/suite-room/Suite Room Interior - 1.JPG",
  boatTwo: "/images/rooftop/Rooftop - 1.JPG",
  sunset: "/images/views/sunset-sailing.JPG",
  boatTopdown: "/media/boat-topdown-horizontal.png",
  boatCutout: "/media/boat-cutout.png",
  logoWhite: "/media/logo-dark-bg.png",
  logoBlack: "/media/logo-light-bg.png",
  logoWhiteFull: "/media/logo-dark-bg.png",
  logoBlackFull: "/media/logo-light-bg.png",
  
  // Skydeck & Starlight Lounge Collection
  skydeckGallery: [
    "/images/Skydeck and Starlight Lounge/Sky Deck & Starlight Lounge.JPG",
    "/images/Skydeck and Starlight Lounge/Sky deck & Starlight Lounge_1.JPG",
    "/images/Skydeck and Starlight Lounge/Sky Deck & Starlight Lounge_2.JPG",
    "/images/Skydeck and Starlight Lounge/Sky Deck & Starlight Lounge_3.JPG",
    "/images/Skydeck and Starlight Lounge/Sky Deck & Starlight Lounge_4.jpg",
    "/images/Skydeck and Starlight Lounge/Top View.JPG"
  ],

  // Rooftop Collection
  rooftopGallery: [
    "/images/roof top/Rooftop - 1.JPG",
    "/images/roof top/Rooftop - 2.JPG",
    "/images/roof top/rooftop-bottom-1.JPG",
    "/images/roof top/rooftop-bottom-2.JPG",
    "/images/roof top/rooftop-bottom-3.JPG",
    "/images/roof top/rooftop-bottom-4.JPG"
  ]
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Staterooms", href: "/rooms" },
  { label: "Experiences", href: "/experiences" },
  { label: "Dining", href: "/dining" },
  { label: "Hire My Boat", href: "/boat-experience" },
  { label: "The Vessel", href: "/vessel" },
  { label: "Gallery", href: "/gallery" }
];

export interface RoomData {
  id: string;
  slug: string;
  roomNumber: string;
  name: string;
  category: string;
  price: number;
  memberPrice: number;
  image: string;
  gallery: string[];
  size: string;
  guests: string;
  maxGuests: number;
  bedType: string;
  bathrooms: number;
  tone: string;
  description: string;
  amenities: string[];
  features: string[];
}

export const rooms: RoomData[] = [
  {
    id: "room-1",
    slug: "lake-view-suite",
    roomNumber: "01",
    name: "The Morning Dew Cabin",
    category: "Deluxe Lakefront Suite",
    price: 18999,
    memberPrice: 17200,
    image: "/images/rooms/room-1/Room - interior - 1.JPG",
    gallery: [
      "/images/rooms/room-1/Room - interior - 1.JPG",
      "/images/rooms/room-1/Room - interior - 2.JPG",
      "/images/rooms/room-1/Room - interior - 3.JPG",
      "/images/rooms/room-1/Room - interior - 4.JPG",
      "/images/rooms/room-1/Balcony - 1.JPG",
      "/images/rooms/room-1/Balcony - 2.JPG",
      "/images/rooms/room-1/Washroom -1.JPG",
      "/images/rooms/room-1/Washroom -2.JPG",
      "/images/rooms/room-1/Washroom -3.JPG",
      "/images/rooms/room-1/Washroom -4.JPG"
    ],
    size: "340 sq ft / 32 m²",
    guests: "2 Guests",
    maxGuests: 2,
    bedType: "1 King-size Floating Bed",
    bathrooms: 1,
    tone: "Private sunrise deck facing the calm waters of Tehri Lake with natural cedar wood finish and morning mist views.",
    description: "Carefully designed to create an intimate connection with the waters of Tehri Lake. Features warm natural cedar tones, floor-to-ceiling panoramic glass, a private overwater balcony, and an en-suite rain shower sanctuary.",
    amenities: ["Private Lake Balcony", "King Floating Bed", "High-speed Starlink Wi-Fi", "Panoramic Rainshower", "Artisan Coffee Bar", "Climate Controlled AC"],
    features: ["Direct Lakefront View", "Breakfast, Dinner & Snacks Included", "Complimentary Speedboat Transfer", "Sunset Cruise with High Tea Included"]
  },
  {
    id: "room-2",
    slug: "sunset-cabin",
    roomNumber: "02",
    name: "The Tehri Vista Cabin",
    category: "Sunset Vista Deluxe Suite",
    price: 18999,
    memberPrice: 17200,
    image: "/images/rooms/room-2/Room 2 Interior - 1.JPG",
    gallery: [
      "/images/rooms/room-2/Room 2 Interior - 1.JPG",
      "/images/rooms/room-2/Room 2 Interior - 2.JPG",
      "/images/rooms/room-2/Room 2 Interior - 3.JPG",
      "/images/rooms/room-2/Room 2 Interior - 4.JPG",
      "/images/rooms/room-2/Room 2 Interior - 5.JPG",
      "/images/rooms/room-2/Room 2 Balcony - 1.JPG",
      "/images/rooms/room-2/Room 2 Balcony - 2.JPG",
      "/images/rooms/room-2/Room 2 Balcony - 3.JPG",
      "/images/rooms/room-2/Room 2 Balcony - 4.JPG",
      "/images/rooms/room-2/Room 2 Washroom - 1.JPG",
      "/images/rooms/room-2/Room 2 Washroom - 2.JPG",
      "/images/rooms/room-2/Room 2 Washroom - 3.JPG",
      "/images/rooms/room-2/Room 2 Washroom - 4.JPG"
    ],
    size: "310 sq ft / 29 m²",
    guests: "2 Guests",
    maxGuests: 2,
    bedType: "1 Queen-size Luxury Bed",
    bathrooms: 1,
    tone: "Golden hour sanctuary crafted for slow evenings, panoramic horizon windows and bespoke leather detailing.",
    description: "Framed to capture Tehri's golden hours as the sun dips below the Garhwal Himalayan ridge. Complete with sunken deck seating, handcrafted oak paneling, and acoustic isolation for ultimate serenity.",
    amenities: ["Sunset Veranda", "Queen Luxury Bed", "Complimentary Mini Bar", "Marble Ensuite Bath", "Starlink Wi-Fi", "Evening Turndown Service"],
    features: ["Sunset Horizon Orientation", "Private Tea & Artisan Beverage Ritual", "Breakfast, Dinner & Snacks Included", "Sunset Cruise Included"]
  },
  {
    id: "room-3",
    slug: "mountain-deck-room",
    roomNumber: "03",
    name: "The Azure Deck Cabin",
    category: "Upper Deck Deluxe Suite",
    price: 18999,
    memberPrice: 17200,
    image: "/images/rooms/room-3/Room3 Interior - 1.JPG",
    gallery: [
      "/images/rooms/room-3/Room3 Interior - 1.JPG",
      "/images/rooms/room-3/Room3 Interior - 2.JPG",
      "/images/rooms/room-3/Room3 Interior - 4.JPG",
      "/images/rooms/room-3/Room3 Balcony - 1.JPG",
      "/images/rooms/room-3/Room3 Balcony - 2.JPG",
      "/images/rooms/room-3/Room3 Washroom - 1.JPG",
      "/images/rooms/room-3/Room3 Washroom - 2.JPG",
      "/images/rooms/room-3/Room3 Washroom - 3.JPG",
      "/images/rooms/room-3/Room3 Washroom - 4.JPG"
    ],
    size: "325 sq ft / 30 m²",
    guests: "2 Guests",
    maxGuests: 2,
    bedType: "1 King-size Bed",
    bathrooms: 1,
    tone: "A refined mountain hideaway with dual-aspect lake glass and direct access to the upper observation deck.",
    description: "Positioned on the yacht's upper vantage with sweeping views across both the azure reservoir and the alpine peaks. Minimalist Japanese-Scandinavian aesthetics with direct access to the private stargazing lounge.",
    amenities: ["Dual-Aspect Glass", "King Plush Bed", "Upper Deck Access", "Handcrafted Stone Vanity", "Bose Ambient Sound", "High-speed Wi-Fi"],
    features: ["Observation Deck Access", "Breakfast, Dinner & Snacks Included", "Stargazing Telescope Setup", "Mountain & Lake Panorama"]
  },
  {
    id: "room-4",
    slug: "captains-residence",
    roomNumber: "04",
    name: "The Presidential Lake Suite",
    category: "Signature Luxury Suite",
    price: 23999,
    memberPrice: 21500,
    image: "/images/rooms/suite-room/Suite Room Interior - 1.JPG",
    gallery: [
      "/images/rooms/suite-room/Suite Room Interior - 1.JPG",
      "/images/rooms/suite-room/Suite Room Interior - 2.JPG",
      "/images/rooms/suite-room/Suite Room Interior - 3.JPG",
      "/images/rooms/suite-room/Suite Room Interior - 4.JPG",
      "/images/rooms/suite-room/Suite Room Interior - 5.JPG",
      "/images/rooms/suite-room/Suite Room Interior - 6.JPG",
      "/images/rooms/suite-room/Suite Room Interior - 7.JPG",
      "/images/rooms/suite-room/Suite Room Interior - 8.JPG",
      "/images/rooms/suite-room/Suite Room - 1.JPG",
      "/images/rooms/suite-room/Suite Room - 2.JPG",
      "/images/rooms/suite-room/Suite Room - 3.JPG",
      "/images/rooms/suite-room/Suite Room Washroom - 1.JPG",
      "/images/rooms/suite-room/Suite Room Washroom - 2.JPG",
      "/images/rooms/suite-room/Suite Room Washroom - 3.JPG",
      "/images/rooms/suite-room/Suite Room Washroom - 4.JPG",
      "/images/rooms/suite-room/Suite Room Washroom - 5.JPG"
    ],
    size: "460 sq ft / 43 m²",
    guests: "3 Guests",
    maxGuests: 3,
    bedType: "1 Grand Master King Bed + Daybed",
    bathrooms: 1,
    tone: "The crown jewel of Lake Escape with 360° private bow terrace, deep soaking panoramic tub and personal butler service.",
    description: "The definitive floating penthouse experience. Boasting expansive master living quarters, a freestanding panoramic soaking bathtub overlooking the open water, 360-degree private wrap-around terrace, and personalized concierge.",
    amenities: ["360° Wrap-around Terrace", "Panoramic Soaking Tub", "Grand Master King Bed", "Dedicated Butler Call", "Executive Salon Lounge", "Private Dining Service"],
    features: ["Priority Speedboat Boarding", "Breakfast, Dinner & Snacks Included", "Sunset High Tea Cruise", "Personalized Itinerary Curation"]
  }
];

export const charterPackages = [
  {
    id: "whole-boat-charter",
    title: "Exclusive Whole Boat Buyout",
    price: 80000,
    unit: "per night",
    capacity: "Up to 12 Guests (Full Boat Access)",
    inclusions: [
      "Exclusive private access to all 4 luxury en-suite staterooms",
      "Dedicated on-board executive chef with fully customizable gourmet menu",
      "All meals: Slow mountain breakfast, Sunset High Tea, Multi-course dinner & snacks",
      "Daily sunset & scenic evening cruise covering Dobra Bridge",
      "Complimentary VIP speedboat transfers to/from Koti Colony jetty",
      "Full access to 360° Skydeck, stargazing telescope & panoramic open-air lounge",
      "High-speed Starlink maritime connectivity throughout"
    ],
    idealFor: "Family celebrations, intimate weddings, corporate retreats, private gatherings"
  },
  {
    id: "sunset-cruise-package",
    title: "Scenic Sunset Cruise & High Tea",
    price: 3000,
    unit: "per person",
    timing: "4:00 PM – 6:00 PM",
    capacity: "Max 25 Persons",
    inclusions: [
      "2-hour curated sailing across Tehri Lake",
      "Panoramic views of Dobra Chanti Bridge and Garhwal ridges",
      "Chef-prepared gourmet High Tea hamper and beverages",
      "Speedboat transfers included"
    ],
    idealFor: "Day visitors, photography enthusiasts, romantic evenings"
  },
  {
    id: "extra-bed",
    title: "Additional Guest / Extra Bed",
    price: 5000,
    unit: "per person / night",
    inclusions: [
      "Comfortable extra bed setup in suite",
      "All meals included: Breakfast, dinner & snacks",
      "Full access to cruises & boat amenities"
    ]
  }
];

export const experiences = [
  {
    id: "exp-speedboat",
    title: "Tehri Watersports & Speedboat Excursion",
    tag: "HIGH ADRENALINE · VIDEO",
    image: "/images/hallway/cockpit.JPG",
    video: "/media/speedboat-adventure.mp4",
    duration: "Flexible Daily Excursion",
    price: "Included with Transfers",
    description: "Experience the thrill of private high-speed launch navigation across the deep blue waters of Tehri Lake, cruising through dramatic mountain gorges.",
    text: "Speedboat tender excursions exploring hidden fjord-like inlets across Tehri Lake.",
    isVideo: true,
    gallery: [
      "/images/views/sunset-sailing.JPG",
      "/images/views/lake-view.JPG",
      "/images/hallway/cockpit.JPG"
    ]
  },
  {
    id: "exp-skydeck",
    title: "Stargazing & Skydeck Starlight Lounge",
    tag: "EVENING SANCTUARY · CAROUSEL",
    image: "/images/Skydeck and Starlight Lounge/Sky Deck & Starlight Lounge.JPG",
    duration: "Nightlong Anchorage",
    price: "Included in Stays & Charter",
    description: "Anchor in prime secluded waters beneath zero-light-pollution dark skies on our 360° open-air top skydeck equipped with stargazing telescopes.",
    text: "Anchor in prime seclusion with telescope stargazing under zero-light-pollution skies.",
    gallery: [
      "/images/Skydeck and Starlight Lounge/Sky Deck & Starlight Lounge.JPG",
      "/images/Skydeck and Starlight Lounge/Sky deck & Starlight Lounge_1.JPG",
      "/images/Skydeck and Starlight Lounge/Sky Deck & Starlight Lounge_2.JPG",
      "/images/Skydeck and Starlight Lounge/Sky Deck & Starlight Lounge_3.JPG",
      "/images/Skydeck and Starlight Lounge/Sky Deck & Starlight Lounge_4.jpg",
      "/images/Skydeck and Starlight Lounge/Top View.JPG"
    ]
  },
  {
    id: "exp-rooftop",
    title: "Rooftop Observation & Sunset High Tea",
    tag: "PANORAMIC VIEWS · CAROUSEL",
    image: "/images/roof top/Rooftop - 1.JPG",
    duration: "4:00 PM – 6:00 PM",
    price: "₹3,000 / person (Included in Stay)",
    description: "360-degree panoramic vantage point for Himalayan sunrise yoga, afternoon artisan teas, and golden hour views of Dobra Chanti Bridge.",
    text: "Panoramic open-air rooftop sun lounge for evening high tea and golden hour views.",
    gallery: [
      "/images/roof top/Rooftop - 1.JPG",
      "/images/roof top/Rooftop - 2.JPG",
      "/images/roof top/rooftop-bottom-1.JPG",
      "/images/roof top/rooftop-bottom-2.JPG",
      "/images/roof top/rooftop-bottom-3.JPG",
      "/images/roof top/rooftop-bottom-4.JPG"
    ]
  },
  {
    id: "exp-dining",
    title: "Private Chef & Wood-Fired Gastronomy",
    tag: "CULINARY JOURNEY",
    image: "/images/dining/day.JPG",
    duration: "Breakfast, Lunch & Dinner",
    price: "Customizable Menu Included",
    description: "A private candlelit feast on the water prepared by our dedicated on-board executive chef, pairing fresh Himalayan trout with mountain-foraged herbs.",
    text: "A bespoke candlelit dinner on the open water crafted by your private chef.",
    gallery: [
      "/images/dining/day.JPG",
      "/images/dining/night.JPG",
      "/images/dining/breakfast.JPG"
    ]
  }
];

export const cuisines = [
  {
    id: "cuisine-1",
    name: "Garhwali Mandua Roti & Jhakhiya Aloo",
    category: "Breakfast",
    description: "Finger millet breads served with local wild-mustard tempered potatoes and fresh churned butter.",
    price: 650,
    image: "/images/dining/day.JPG"
  },
  {
    id: "cuisine-2",
    name: "Himalayan Trout Grill",
    category: "Entrée",
    description: "Freshly caught trout marinated with mountain wild yellow mustard and grilled over wood-embers on the deck.",
    price: 1850,
    image: "/images/dining/night.JPG"
  },
  {
    id: "cuisine-3",
    name: "Koda Roti & Chainsoo",
    category: "Main Course",
    description: "Slow-cooked black gram gravy cooked in an iron kadhai, served with traditional hill wheat bread and ghee.",
    price: 1100,
    image: "/images/rooms/suite-room/Suite Room Interior - 1.JPG"
  },
  {
    id: "cuisine-4",
    name: "Rhododendron Blossom Cooler",
    category: "Beverages",
    description: "Sweet, tangy syrup made from wild red rhododendron flowers, served with club soda, lemon, and fresh hill mint.",
    price: 350,
    image: "/images/views/sunset-sailing.JPG"
  }
];

export const faqs: [string, string][] = [
  ["How many staterooms are available aboard Lake Escape?", "Lake Escape features four private bespoke suites (3 Deluxe Suites at ₹18,999/night and 1 Signature Presidential Suite at ₹23,999/night), accommodating up to 10 guests. You can also book an exclusive Whole Boat Buyout at ₹75,000/night."],
  ["What is included in the room tariff?", "All room reservations include breakfast, scheduled sunset high tea cruise, dinner & snacks, private speedboat transfers to and from Koti Colony jetty, and high-speed Starlink Wi-Fi."],
  ["Where is the boarding jetty for Lake Escape?", "Guests board via our private VIP speedboats at Koti Colony Bay Jetty on Tehri Lake, New Tehri, Uttarakhand (249001). transfers take approximately 8-10 minutes."],
  ["Can I hire the boat for a sunset cruise without an overnight stay?", "Yes, our Sunset Cruise runs daily from 4:00 PM to 6:00 PM for ₹3,000 per person, including high tea and scenic lake navigation around the Dobra Chanti Bridge."],
  ["What safety measures are present on board?", "Every suite is equipped with life jackets. The vessel maintains certified fire safety systems, automated bilge and navigation gear, emergency evacuation protocols, and round-the-clock trained marine staff."],
  ["What happens if the boat cannot sail due to weather or technical factors?", "In the event that adverse weather or reservoir conditions prevent the boat from sailing, the vessel remains anchored safely in the serene waters of the lake. Guests continue to enjoy the full floating luxury experience, stateroom comfort, private chef dining, and breathtaking lake views from the side of the water, which itself is a quintessential part of the stay."],
  ["Are barbecue, swimming, or alcohol permitted on board?", "To preserve marine safety, passenger tranquility, and pristine reservoir ecology, open barbecues, swimming directly from the vessel, and all alcoholic or wine beverages are strictly prohibited on board."]
];

export const vesselSpecs = [
  { label: "LENGTH OVERALL", value: "32 METERS / 105 FT" },
  { label: "CRUISING WATERWAY", value: "TEHRI LAKE, UTTARAKHAND" },
  { label: "GUEST CAPACITY", value: "4 STATEROOMS (UP TO 10 GUESTS)" },
  { label: "DECKS", value: "2 DECKS (STATEROOMS & SKYDECK LOUNGE)" },
  { label: "PROPULSION & POWER", value: "HYBRID SILENT SOLAR / ECO GRID" },
  { label: "CONNECTIVITY", value: "HIGH-SPEED STARLINK MARITIME WI-FI" }
];

export interface GalleryPhotoItem {
  id: string;
  src: string;
  title: string;
  category: "suites" | "skydeck" | "rooftop" | "dining" | "views" | "video";
  categoryLabel: string;
  description: string;
  type?: "image" | "video";
}

export const galleryPhotos: GalleryPhotoItem[] = [
  // Speedboat Video
  {
    id: "gal-video-1",
    src: "/media/speedboat-adventure.mp4",
    title: "Tehri Speedboat Excursion",
    category: "video",
    categoryLabel: "Video Excursion",
    description: "High-speed launch adventure through the Himalayan mountain gorges of Tehri Lake.",
    type: "video"
  },
  // Skydeck & Starlight Lounge
  {
    id: "gal-skydeck-1",
    src: "/images/Skydeck and Starlight Lounge/Sky Deck & Starlight Lounge.JPG",
    title: "Skydeck Starlight Lounge",
    category: "skydeck",
    categoryLabel: "Skydeck",
    description: "360-degree open-air celestial viewing lounge on the top deck."
  },
  {
    id: "gal-skydeck-2",
    src: "/images/Skydeck and Starlight Lounge/Top View.JPG",
    title: "Skydeck Aerial Perspective",
    category: "skydeck",
    categoryLabel: "Skydeck",
    description: "Expansive top vantage point looking across Tehri Lake."
  },
  {
    id: "gal-skydeck-3",
    src: "/images/Skydeck and Starlight Lounge/Sky deck & Starlight Lounge_1.JPG",
    title: "Starlight Lounge Seating",
    category: "skydeck",
    categoryLabel: "Skydeck",
    description: "Plush cushions and firelit tables for late-night stargazing."
  },
  {
    id: "gal-skydeck-4",
    src: "/images/Skydeck and Starlight Lounge/Sky Deck & Starlight Lounge_2.JPG",
    title: "Sunset Skydeck Atmosphere",
    category: "skydeck",
    categoryLabel: "Skydeck",
    description: "Twilight views across the mirror-calm Himalayan reservoir."
  },
  // Rooftop Collection
  {
    id: "gal-rooftop-1",
    src: "/images/roof top/Rooftop - 1.JPG",
    title: "Rooftop Sun Deck Lounge",
    category: "rooftop",
    categoryLabel: "Rooftop",
    description: "Open-air wooden sun loungers for morning yoga and high tea."
  },
  {
    id: "gal-rooftop-2",
    src: "/images/roof top/Rooftop - 2.JPG",
    title: "Rooftop Panoramic Vantage",
    category: "rooftop",
    categoryLabel: "Rooftop",
    description: "Unobstructed vistas of the Garhwal Himalayan ridge."
  },
  {
    id: "gal-rooftop-3",
    src: "/images/roof top/rooftop-bottom-1.JPG",
    title: "Rooftop Evening Setting",
    category: "rooftop",
    categoryLabel: "Rooftop",
    description: "Ambient warm lighting under the alpine night sky."
  },
  // Suites & Staterooms
  {
    id: "gal-suite-1",
    src: "/images/rooms/suite-room/Suite Room Interior - 1.JPG",
    title: "Presidential Lake Suite Salon",
    category: "suites",
    categoryLabel: "Staterooms",
    description: "Spacious master stateroom with floating king bed and cedar paneling."
  },
  {
    id: "gal-suite-2",
    src: "/images/rooms/suite-room/Suite Room Washroom - 1.JPG",
    title: "Panoramic Soaking Tub",
    category: "suites",
    categoryLabel: "Staterooms",
    description: "Freestanding soaking bathtub overlooking the calm open water."
  },
  {
    id: "gal-suite-3",
    src: "/images/rooms/suite-room/Suite Room - 1.JPG",
    title: "Presidential Private Terrace",
    category: "suites",
    categoryLabel: "Staterooms",
    description: "Wrap-around overwater deck with direct panoramic water access."
  },
  {
    id: "gal-room1-1",
    src: "/images/rooms/room-1/Room - interior - 1.JPG",
    title: "The Morning Dew Cabin",
    category: "suites",
    categoryLabel: "Staterooms",
    description: "Sunrise-facing luxury stateroom with private balcony."
  },
  {
    id: "gal-room1-2",
    src: "/images/rooms/room-1/Balcony - 1.JPG",
    title: "Morning Dew Private Deck",
    category: "suites",
    categoryLabel: "Staterooms",
    description: "Overwater balcony overlooking the early morning mountain mist."
  },
  {
    id: "gal-room2-1",
    src: "/images/rooms/room-2/Room 2 Interior - 1.JPG",
    title: "The Tehri Vista Cabin",
    category: "suites",
    categoryLabel: "Staterooms",
    description: "Golden hour orientation with bespoke leather and oak craftsmanship."
  },
  {
    id: "gal-room3-1",
    src: "/images/rooms/room-3/Room3 Interior - 1.JPG",
    title: "The Azure Deck Cabin",
    category: "suites",
    categoryLabel: "Staterooms",
    description: "Upper deck luxury suite with dual-aspect glass and skydeck access."
  },
  // Dining & Lounges
  {
    id: "gal-dining-1",
    src: "/images/dining/day.JPG",
    title: "Floating Deck Table Service",
    category: "dining",
    categoryLabel: "Dining",
    description: "Breakfast and lunch served open-air on the water."
  },
  {
    id: "gal-dining-2",
    src: "/images/dining/night.JPG",
    title: "Candlelit Deck Gastronomy",
    category: "dining",
    categoryLabel: "Dining",
    description: "Candlelit gourmet dining and regional alpine delicacies under the stars."
  },
  {
    id: "gal-lounge-1",
    src: "/images/hallway/cockpit.JPG",
    title: "Navigation Helm & Lounge",
    category: "dining",
    categoryLabel: "Lounges",
    description: "Architectural helm and communal indoor relaxation salon."
  },
  // Views & Lake Sunsets
  {
    id: "gal-view-1",
    src: "/images/views/sunset-sailing.JPG",
    title: "Speedboat at Golden Hour",
    category: "views",
    categoryLabel: "Views",
    description: "Speedboat gliding across Tehri Lake during sunset."
  },
  {
    id: "gal-view-2",
    src: "/images/views/lake-view.JPG",
    title: "Himalayan Gorge Stillness",
    category: "views",
    categoryLabel: "Views",
    description: "Mirror reflections on 42 square kilometres of alpine reservoir."
  },
  {
    id: "gal-view-3",
    src: "/images/views/night-view.jpg",
    title: "Tehri Night Horizon",
    category: "views",
    categoryLabel: "Views",
    description: "The illuminated Dobra Chanti Bridge glowing over Tehri Lake under the starlit alpine sky."
  }
];

