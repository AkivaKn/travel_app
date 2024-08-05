import ItineraryForm from "../components/ItineraryForm";

export default function PostItinerary() {
  return (
      <div className="flex flex-col">
      <h1 className="head_text text-center blue_gradient pb-4 ">Post Itinerary</h1>
      {/* <p className="desc flex-center max-w-md ">Share your itineraries with the rest of the world</p> */}
      <ItineraryForm/>
    </div>
      )
  }
