"use server";

import { auth } from "../../../auth";
import ItinerariesList from "../components/ItinerariesList";

export default async function PlanTrip() {
  const session = await auth();

  return <ItinerariesList session={session} />;
}
