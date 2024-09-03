import ItineraryCard from "./ItineraryCard";

export default function ItinerariesList({ itineraries, session }) {
  return (
    <ul className="flex flex-wrap justify-center items-center mt-10">
      {itineraries.map((itinerary) => (
        <li key={itinerary.itinerary_id}>
          <ItineraryCard session={session} itinerary={itinerary} />
        </li>
      ))}
    </ul>
  );
}
