"use server";
import { getItineraryById } from "@/app/lib/data/itineraries";
import { auth } from "../../../../auth";

import FullItinerary from "@/app/components/FullItinerary";

export default async function ViewSingleItinerary({ params }) {
  const { itineraryId } = params;
  const session = await auth();
  console.log(session);

  const itinerary = await getItineraryById(itineraryId);
  return <FullItinerary session={session} itinerary={itinerary} />;
}
