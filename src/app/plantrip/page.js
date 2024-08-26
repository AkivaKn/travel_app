"use server";

import { auth } from "../../../auth";
import ItinerariesList from "../components/ItinerariesList";

export default async function PlanTrip() {
  const session = await auth();

  return (
    <div className="flex flex-col">
    <h1 className='text-center text-3xl mx-auto head_text green_gradient'>
        Plan Your Trip
      </h1>
  <ItinerariesList session={session} />;
  </div>
);
}
