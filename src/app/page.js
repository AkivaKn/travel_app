import ItineraryCard from "./components/ItineraryCard";
import { getPopularItineraries } from "./lib/data/itineraries";

export default async function Home() {

  const popularItineraries = await getPopularItineraries()

  return (
    <>
      <h1 class='text-center text-3xl m-10'>Home Page</h1>
      <ul>
        {popularItineraries.map((itinerary) => (
          <li key={itinerary.itinerary_id}>
            <ItineraryCard itinerary={itinerary} />
          </li>
        ))}
      </ul>
    </>
  );
}
