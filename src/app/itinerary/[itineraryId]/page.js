"use server";
import { getItineraryById } from "@/app/lib/data/itineraries";
import { auth } from "../../../../auth";
import { getLatLongFromAddress } from "@/app/utils/utils";

import FullItinerary from "@/app/components/FullItinerary";

export default async function ViewSingleItinerary({ params }) {
  const { itineraryId } = params;
  const session = await auth();
  const itinerary = await getItineraryById(itineraryId);
  const locationList = itinerary.itineraryDays.map((day) => 
    day.place ? `${day.place},${day.region},${day.country}` : `${day.region},${day.country}`
);
const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY; 
  const coordinates = await Promise.all(
    locationList.map((location) => {
      const coords = getLatLongFromAddress(location);
      return coords;
    })
  );
  return (
    <FullItinerary
      session={session}
      itinerary={itinerary}
      coordinates={coordinates}
      locations={locationList}
      apikey={apiKey}
    />
  );
}
