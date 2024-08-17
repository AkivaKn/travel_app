"use server";
import UpdateItineraryForm from "@/app/components/UpdateItineraryForm";
import { getItineraryById } from "@/app/lib/data/itineraries";

export default async function updateItinerary({ params }) {
  const { itineraryId } = params;
  const itinerary = await getItineraryById(itineraryId);
  return <UpdateItineraryForm itinerary={itinerary} page='patch' />;
}
