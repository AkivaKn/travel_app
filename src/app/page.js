import ItineraryCard from "./components/ItineraryCard";
import { getPopularItineraries } from "./lib/data/itineraries";

export default async function Home() {
    const popularItineraries = await getPopularItineraries();

    return (
      <>
        <h1 className="font-satoshi text-center text-3xl m-5">Popular Itineraries:</h1>
        <ul className="flex flex-wrap justify-center">
          {popularItineraries.map((itinerary) => (
            <li key={itinerary.itinerary_id}>
              <ItineraryCard itinerary={itinerary} />
            </li>
          ))}
        </ul>
      </>
    );

}

