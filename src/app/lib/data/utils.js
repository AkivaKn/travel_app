import { put } from "@vercel/blob";

export async function uploadImage(imageFile) {
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    return blob.url;
  }