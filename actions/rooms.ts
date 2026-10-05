"use server";

import { prisma } from "@/lib/prisma";
import { rooms as staticRooms, RoomData } from "@/lib/data";

export async function getRooms(): Promise<{ ok: boolean; data: RoomData[] }> {
  try {
    if (process.env.DATABASE_URL && prisma) {
      const dbRooms = await prisma.room.findMany({
        orderBy: { createdAt: "asc" },
      });

      if (dbRooms && dbRooms.length > 0) {
        // Merge DB pricing/descriptions with rich local metadata (galleries, amenities)
        const mergedRooms: RoomData[] = staticRooms.map((staticRoom) => {
          const matchedDb = dbRooms.find((d) => d.slug === staticRoom.slug);
          if (matchedDb) {
            return {
              ...staticRoom,
              name: matchedDb.name || staticRoom.name,
              price: matchedDb.price || staticRoom.price,
              tone: matchedDb.description || staticRoom.tone,
            };
          }
          return staticRoom;
        });
        return { ok: true, data: mergedRooms };
      }
    }
    return { ok: true, data: staticRooms };
  } catch (error) {
    console.warn("Database offline or uninitialized. Falling back to static rooms registry:", error);
    return { ok: true, data: staticRooms };
  }
}

export async function getRoomBySlug(slug: string): Promise<{ ok: boolean; data: RoomData | null }> {
  try {
    const staticRoom = staticRooms.find((r) => r.slug === slug) || null;
    if (!staticRoom) {
      return { ok: false, data: null };
    }

    if (process.env.DATABASE_URL && prisma) {
      const dbRoom = await prisma.room.findUnique({
        where: { slug },
      });

      if (dbRoom) {
        return {
          ok: true,
          data: {
            ...staticRoom,
            name: dbRoom.name || staticRoom.name,
            price: dbRoom.price || staticRoom.price,
            tone: dbRoom.description || staticRoom.tone,
          },
        };
      }
    }

    return { ok: true, data: staticRoom };
  } catch (error) {
    console.warn("Database error querying room by slug. Using static data:", error);
    const staticRoom = staticRooms.find((r) => r.slug === slug) || null;
    return { ok: !!staticRoom, data: staticRoom };
  }
}
