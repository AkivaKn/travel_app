import { sql } from "@vercel/postgres";

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
    console.log(res.rows, "<-- sql results");
    return res.rows;
  } catch (error) {
    console.error("Data fetching error:", error);
    throw new Error("500: Server error")
  }
}
