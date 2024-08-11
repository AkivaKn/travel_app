import DayCard from "@/app/components/DayCard";
import CommentCard from "@/app/components/CommentCard";
import { getItineraryById } from "@/app/lib/data/itineraries";
import { dateFormatting, formatBudget } from "@/app/utils/utils";

export default async function ViewSingleItinerary({ params }) {
  const { itineraryId } = params;

  const { itineraryInfo, itineraryDays, itineraryComments } =
    await getItineraryById(itineraryId);
  const formattedDate = dateFormatting(itineraryInfo.created_at);
  const formattedBudget = formatBudget(itineraryInfo.budget);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-12">
      <section className="border-2 border-gray-300 rounded-lg p-6 mb-6 shadow-lg bg-white">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold ml-2">{itineraryInfo.title}</h1>
          <p className="flex flex-wrap items-center text-gray-700 mx-2">
            {itineraryInfo.username}, {formattedDate}
          </p>
        </div>
        <img
          src={itineraryInfo.itinerary_image_url}
          alt="Itinerary Image"
          className="w-full h-auto rounded-lg shadow-md mb-6"
        />
        <p className="text-gray-700 mx-2 mb-4">
          {itineraryInfo.itinerary_description}
        </p>
        <div className="flex justify-between mt-4 mx-2">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold mr-2">Budget:</h2>
            <p className="text-gray-700">{formattedBudget}</p>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold mr-2">Votes:</h2>
            <p className="text-gray-700">{itineraryInfo.total_votes}</p>
          </div>
        </div>
      </section>
      <h1 className="text-2xl font-bold mb-4">Days</h1>
      <ol className="space-y-4">
        {itineraryDays.map((day) => (
          <li key={day.day_id}>
            <DayCard day={day} />
          </li>
        ))}
      </ol>
      <h1 className="text-2xl font-bold my-6">Comments</h1>
      <ol className="space-y-4">
        {itineraryComments.map((comment) => (
          <li key={comment.comment_id}>
            <CommentCard comment={comment} />
          </li>
        ))}
      </ol>
    </div>
  );
}
