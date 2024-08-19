"use server";
import { put } from "@vercel/blob";
import { sql } from "@vercel/postgres";

export async function uploadImage(imageFile) {
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
  });
  return blob.url;
}

export async function getAllImages() {
  try {
    const allImages = await sql`SELECT itinerary_image_url, itinerary_id
    FROM itineraries
    `;
    return allImages.rows;
  } catch (error) {
    console.error("Data fetching error:", error);
    throw new Error("500: Server error");
  }
}
