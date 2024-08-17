"use server";
import ItineraryForm from "@/app/components/ItineraryForm";
import { getItineraryById } from "@/app/lib/data/itineraries";

export default async function updateItinerary({ params }) {
  const { itineraryId } = params;
  const itinerary = await getItineraryById(itineraryId);
  return <ItineraryForm itinerary={itinerary} page='patch' />;
}
