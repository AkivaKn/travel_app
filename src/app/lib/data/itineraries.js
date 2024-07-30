import { sql } from "@vercel/postgres";

export async function getPopularItineraries() {
  try {
    const res = await sql`
        SELECT * FROM itineraries
        LIMIT 3;`;
    return res.rows;
  } catch (error) {
    console.error("Data fetching error:", error);
    return null;
  }
}
