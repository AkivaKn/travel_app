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
        
        <h2 className="font-bold text-lg hover:underline pb-2">{itinerary.title}</h2>
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

{
  /* CTA */
}
{
  /* <div className="">
  <a role="button" href="#" className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">View Itinerary</a>
</div> */
}

      // <div className="px-5 py-2 border- sm:w-80 border-solid bg-slate-300 hover:bg-slate-400 border-black border-2 mb-8 mx-4 rounded-md h-30">
      //   <section className="flex flex-col items-center ">
      //   <h1 className="font-satoshi font-semibold text-lg underline">{itinerary.title}</h1>
      //   {/* <hr/> */}
      //   <img
      //     className="m-auto object-cover h-40 border-black border-2"
      //     src={
      //       !itinerary.itinerary_image_url
      //         ? "/assets/images/stock-holiday-photo.png"
      //         : itinerary.itinerary_image_url
      //     }
      //   />
      //   <h2 className="font-satoshi text-m">{itinerary.itinerary_description}</h2>
      //   <h2 className="font-satoshi text-m">
      //     Posted on: {dateFormatting(itinerary.created_at)}
      //   </h2>
      // </section>
      //   <section className="flex justify-between items-center mt-4">
      //     <p className="font-satoshi">
      //       {formatBudget(itinerary.budget)}
      //     </p>
      //     <p className="font-satoshi">
      //       {itinerary.total_votes === 1
      //         ? `${itinerary.total_votes} vote`
      //         : `${itinerary.total_votes} votes`}
      //     </p>
      //   </section>
      // </div>