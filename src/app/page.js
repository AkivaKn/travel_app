import { auth } from "../../auth";
import Carroussel from "./components/Carroussel";
import ItineraryCard from "./components/ItineraryCard";
import { getItineraries } from "./lib/data/itineraries";
import { getAllImages } from "./lib/data/images";

export default async function Home() {
  const popularItineraries = await getItineraries(3);
  const images = await getAllImages();
  const session = await auth();
  return (
    <div className="flex flex-col">
      
      <Carroussel images={images} />
      <h1 className="head_text orange_gradient text-center pb-4 mt-24">
        Popular Itineraries:
      </h1>
      <ul className="flex flex-wrap justify-center mt-10">
        {popularItineraries.map((itinerary) => (
          <li key={itinerary.itinerary_id}>
            <ItineraryCard itinerary={itinerary} session={session} />
          </li>
        ))}
      </ul>
    </div>
  );
}
