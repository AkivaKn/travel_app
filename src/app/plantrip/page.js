"use server";

import { auth } from "../../../auth";
import ItinerariesList from "../components/ItinerariesList";
import TypewriterTitle from "../components/TypewriterTitle";

export default async function PlanTrip() {
  const session = await auth();

  return (
    <div className="flex flex-col ">
      <div className="pl-2 flex justify-center w-full max-w-5xl pb-10 text-3xl mx-auto head_text green_gradient">
        <div className="w-1/2 text-right">
          <h1>Plan Your&nbsp;</h1>
        </div>
        <div className="w-1/2 text-left">
          <TypewriterTitle
            strArray={["Journey", "Holiday", "Trip", "Adventure", "Vacation"]}
          />
        </div>
      </div>
      <ItinerariesList session={session} />;
    </div>
  );
}
