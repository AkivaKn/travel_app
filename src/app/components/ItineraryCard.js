import { dateFormatting, formatBudget } from "../utils/utils";

export default function ItineraryCard({ itinerary }) {
  return (
    <div className="border-2 m-4 rounded-md">
      <h2>{itinerary.itinerary_description}</h2>
      <h2>{dateFormatting(itinerary.created_at)}</h2>
      <h2>{formatBudget(itinerary.budget)}</h2>
    </div>
  );
}
