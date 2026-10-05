/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const rooms = [
  {
    slug: "lake-view-suite",
    name: "Lake View Suite",
    description: "Private deck facing Tehri Lake with warm woods, soft linen and sunrise tea service.",
    price: 14500
  },
  {
    slug: "sunset-cabin",
    name: "Sunset Cabin",
    description: "Golden hour views, quiet interiors and a compact lounge crafted for slow evenings.",
    price: 12800
  },
  {
    slug: "mountain-deck-room",
    name: "Mountain Deck Room",
    description: "A refined hideaway with mountain-framed windows and direct access to the upper deck.",
    price: 13200
  },
  {
    slug: "captains-residence",
    name: "Captain's Residence",
    description: "The signature suite with generous living space, premium bath and the best bow views.",
    price: 18500
  }
];

const coupons = [
  { code: "TEHRI10", percent: 10 },
  { code: "ESCAPE20", percent: 20 },
  { code: "LUXURY30", percent: 30 }
];

const cuisines = [
  {
    name: "Garhwali Mandua Roti & Jhakhiya Aloo",
    category: "Breakfast",
    description: "Finger millet breads served with local wild-mustard tempered potatoes and fresh churned butter.",
    price: 650,
    image: "/media/lake-escape-boat-2.png"
  },
  {
    name: "Himalayan Trout Grill",
    category: "Entrée",
    description: "Freshly caught trout marinated with mountain wild yellow mustard and grilled over wood-embers on the deck.",
    price: 1850,
    image: "/media/tehri-sunset.png"
  },
  {
    name: "Koda Roti & Chainsoo",
    category: "Main Course",
    description: "Slow-cooked black gram gravy cooked in an iron kadhai, served with traditional hill wheat bread and ghee.",
    price: 1100,
    image: "/media/lake-escape-boat-1.png"
  },
  {
    name: "Rhododendron Blossom Cooler",
    category: "Beverages",
    description: "Sweet, tangy syrup made from wild red rhododendron flowers, served with club soda, lemon, and fresh hill mint.",
    price: 350,
    image: "/media/tehri-sunset.png"
  },
  {
    name: "Baadi & Gahat Dal Soup",
    category: "Entrée",
    description: "Traditional organic horse-gram soup served with soft boiled flour paste and clarified cow ghee.",
    price: 950,
    image: "/media/lake-escape-boat-2.png"
  }
];

async function main() {
  console.log("Seeding started...");

  // Seed Rooms
  for (const r of rooms) {
    await prisma.room.upsert({
      where: { slug: r.slug },
      update: { name: r.name, description: r.description, price: r.price },
      create: r
    });
  }

  // Seed Coupons
  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: { percent: c.percent },
      create: c
    });
  }

  // Seed Cuisines
  await prisma.cuisine.deleteMany({});
  for (const f of cuisines) {
    await prisma.cuisine.create({
      data: f
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
