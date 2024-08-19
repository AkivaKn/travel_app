import Carroussel from "./components/Carroussel";
import ItineraryCard from "./components/ItineraryCard";
import { getPopularItineraries } from "./lib/data/itineraries";
import { getAllImages } from "./lib/data/images";

export default async function Home() {
  const popularItineraries = await getPopularItineraries();
  const images = await getAllImages();
  return (
    <div className='flex flex-col'>
      <h1 className='head_text orange_gradient text-center pb-4'>
        Popular Itineraries:
      </h1>
      <ul className='flex flex-wrap justify-center mt-10'>
        {popularItineraries.map((itinerary) => (
          <li key={itinerary.itinerary_id}>
            <ItineraryCard itinerary={itinerary} />
          </li>
        ))}
      </ul>
      <Carroussel
        itineraryId={popularItineraries.map(
          (itinerary) => itinerary.itinerary_id
        )}
        images={images}
      />
    </div>
  );
}
