import Link from "next/link";
import { dateFormatting, formatBudget } from "../utils/utils";

export default function ItineraryCard({ itinerary }) {
  return (
    <div className="w-72 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mx-4 mb-8 flex flex-col">
      {/* Image */}
      <img
        className="h-40 pb-2 object-cover rounded-xl"
        src={
          !itinerary.itinerary_image_url
          ? "/assets/images/beach-picture.png"
            : itinerary.itinerary_image_url
          }
          />
        {/* Heading */}
        <Link href={`/itinerary/${itinerary.itinerary_id}`}>
        <h2 className="font-bold text-lg hover:underline pb-2">{itinerary.title}</h2>
        </Link>
        {/* Description */}
        <div className="h-32 overflow-hidden">
        <p className="text-sm text-gray-600 overflow-hidden line-clamp-6">
          {itinerary.itinerary_description}
        </p>
      </div>
      <section className="flex justify-between items-center border-t-2 border-neutral-100  pt-2 text-surface/75 dark:border-white/10 dark:text-neutral-300">
        <p className="text-sm">Budget: <span className="font-bold">{formatBudget(itinerary.budget)}</span></p>
        <p className="text-sm">
          {itinerary.total_votes === 1
            ? `${itinerary.total_votes} vote`
            : `${itinerary.total_votes} votes`}
        </p>
      </section>
    </div>
  );
}