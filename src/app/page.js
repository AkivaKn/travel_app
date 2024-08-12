import ItineraryCard from "./components/ItineraryCard";
import { getItineraries, getPopularItineraries } from "./lib/data/itineraries";

export default async function Home() {
    const popularItineraries = await getPopularItineraries();

    return (
      <div className="flex flex-col">
        <h1 className="head_text orange_gradient text-center pb-4">Popular Itineraries:</h1>
        <ul className="flex flex-wrap justify-center mt-10">
          {popularItineraries.map((itinerary) => (
            <li key={itinerary.itinerary_id}>
              <ItineraryCard itinerary={itinerary} />
            </li>
          ))}
        </ul>
      </div>
    );

}

