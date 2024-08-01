"use server";
import { sql } from "@vercel/postgres";
import { auth } from "../../../../auth";
import { uploadImage } from "../../utils/auth_utils";

export async function getPopularItineraries() {
  // throw new Error("bad error")
  try {
    const res = await sql`
        SELECT i.itinerary_id, i.title, i.itinerary_image_url, i.user_id, i.itinerary_description, i.created_at, i.budget, COALESCE(CAST(SUM(vote_value)AS INTEGER),0) AS total_votes
        FROM itineraries i
        FULL JOIN itinerary_votes v
        ON i.itinerary_id=v.itinerary_id
        GROUP BY i.itinerary_id
        ORDER BY total_votes DESC
        LIMIT 3`;
    return res.rows;
  } catch (error) {
    console.error("Data fetching error:", error);
    throw new Error("500: Server error");
  }
}

export async function postItinerary(formData) {
  const session = await auth()

  const user_id = session.user.user_id
  const title = formData.get("title");
  const itinerary_description = formData.get("description");
  const budget = formData.get("budget");
  const itinerary_image = formData.get("image");
  let itinerary_image_url;

  try {
    if (itinerary_image.size > 0) {
      itinerary_image_url = await uploadImage(itinerary_image);
    }
    const res = await sql`
      INSERT INTO itineraries 
      (title, itinerary_image_url, itinerary_description, user_id, budget)
      VALUES (${title}, ${itinerary_image_url}, ${itinerary_description}, ${user_id}, ${budget})
      RETURNING *`;
    return res.rows[0];
  } catch (error) {
    console.error("Error posting to itineraries:", error);
    throw new Error("Error posting to itineraries");
  }
}
