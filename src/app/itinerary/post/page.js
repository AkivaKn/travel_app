import ItineraryForm from "../../components/ItineraryForm";

export default function PostItinerary() {
  return (
    <div className="flex flex-col">
      <h1 className="pb-10 text-center text-3xl mx-auto head_text blue_gradient">
        Post Itinerary
      </h1>

      <ItineraryForm page="post" />
    </div>
  );
}
