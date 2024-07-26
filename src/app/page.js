import { sql } from "@vercel/postgres";
import ItineraryCard from "./components/ItineraryCard";

export default async function Home() {
  const res = await sql`
              SELECT * FROM itineraries;`;
  const data = res.rows;

  return (
    <>
      <h1 class='text-center text-3xl m-10'>Home Page</h1>
      <ul>
        {data.map((itinerary) => (
          <li key={itinerary.itinerary_id}>
            <ItineraryCard itinerary={itinerary} />
          </li>
        ))}
      </ul>
    </>
  );
}
