"use server";
import ItineraryForm from "@/app/components/ItineraryForm";
import { getItineraryById } from "@/app/lib/data/itineraries";
import { auth } from "../../../../../auth";

export default async function updateItinerary({ params }) {
  const session = await auth()
  const { itineraryId } = params;
  const itinerary = await getItineraryById(itineraryId);
  return <ItineraryForm itinerary={itinerary} page='patch' user={session?.user}/>;
}
