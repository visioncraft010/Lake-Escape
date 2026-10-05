"use server";

import { prisma } from "@/lib/prisma";
import { cuisines as staticCuisines } from "@/lib/data";

export async function getCuisines() {
  try {
    if (process.env.DATABASE_URL && prisma) {
      const dbCuisines = await prisma.cuisine.findMany({
        orderBy: { createdAt: "asc" }
      });

      if (dbCuisines && dbCuisines.length > 0) {
        return { ok: true, data: dbCuisines };
      }
    }

    return { ok: true, data: staticCuisines };
  } catch (error) {
    console.warn("Database offline or unseeded. Fetching cuisines from local data:", error);
    return { ok: true, data: staticCuisines };
  }
}
