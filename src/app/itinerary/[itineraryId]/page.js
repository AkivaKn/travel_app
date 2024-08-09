import DayCard from "@/app/components/DayCard";
import CommentCard from "@/app/components/CommentCard";
import { getItineraryById } from "@/app/lib/data/itineraries";
import { dateFormatting, formatBudget} from "@/app/utils/utils";

export default async function ViewSingleItinerary({params}) {
    const {itineraryId} = params

    const {itineraryInfo, itineraryDays, itineraryComments} = await getItineraryById(itineraryId)
    const formattedDate = dateFormatting(itineraryInfo.created_at)
    const formattedBudget = formatBudget(itineraryInfo.budget)

  return <div>
    <section className="border-2 border-black p-2 m-2">
        <h1>Itinerary Info:</h1>
        <h2>Title: {itineraryInfo.title}</h2>
        <h2>Description: {itineraryInfo.itinerary_description}</h2>
        <h2>Username: {itineraryInfo.username}</h2>
        <h2>Date Posted: {formattedDate}</h2>
        <h2>Budget: {formattedBudget}</h2>
        <h2>Votes: {itineraryInfo.total_votes}</h2>
        <img src={itineraryInfo.itinerary_image_url}/>
    </section>
    <h1 className="m-2">Days:</h1>
    <ol>
        {itineraryDays.map((day) => (
            <li key={day.day_id}>
                <DayCard day={day} />
            </li>
        ))}
    </ol>
    <h1 className="m-2 p-2">Comments:</h1>
    <ol>
        {itineraryComments.map((comment) => (
            <li key={comment.comment_id}>
                <CommentCard comment={comment} />
            </li>
        ))}
    </ol>
  </div>;
}
