import { sql } from "@vercel/postgres";

export async function postDays(daysArray, itineraryId) {
  const itineraryDays = await Promise.all(
    daysArray.map(async (day, index) => {
      const res = await sql`
              INSERT INTO days (itinerary_id, day_number, day_plan, accomodation, transport, country, region, place)
              VALUES (${itineraryId}, ${index + 1}, ${day.dayPlan}, ${
        day.accomodation
      }, 
              ${day.transport}, ${day.country}, ${day.region}, ${
        day.city
      }) RETURNING *;`;
      return res.rows[0];
    })
  );
  return itineraryDays;
}
