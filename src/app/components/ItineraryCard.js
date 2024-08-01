import { dateFormatting, formatBudget } from "../utils/utils";

export default function ItineraryCard({ itinerary }) {
  return (
    <section className="px-5 py-2 border- sm:w-80 border-solid bg-slate-300 hover:bg-slate-400 border-black border-2 mb-8 mx-4 rounded-md">
      <h1 className="font-satoshi font-semibold text-lg">{itinerary.title}</h1>
      <hr/>
      <img
        className="m-auto object-cover h-40"
        src={
          !itinerary.itinerary_image_url
            ? "/assets/images/stock-holiday-photo.png"
            : itinerary.itinerary_image_url
        }
      />
      <h2 className="font-satoshi text-m">{itinerary.itinerary_description}</h2>
      <h2 className="font-satoshi text-m">
        Posted on: {dateFormatting(itinerary.created_at)}
      </h2>
      <hr/>
      <div className="flex justify-between items-center mt-4">
        <p className="font-satoshi">
          {formatBudget(itinerary.budget)}
        </p>
        <p className="font-satoshi">
          {itinerary.total_votes === 1
            ? `${itinerary.total_votes} vote`
            : `${itinerary.total_votes} votes`}
        </p>
      </div>
    </section>
  
  );
}
