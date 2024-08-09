import DayCard from "@/app/components/DayCard";
import { getItineraryById } from "@/app/lib/data/itineraries";
import { dateFormatting } from "@/app/utils/utils";

export default async function ViewSingleItinerary({params}) {
    const {itineraryId} = params

    const {itineraryInfo, itineraryDays, itineraryComments} = await getItineraryById(itineraryId)
    const formattedDate = dateFormatting(itineraryInfo.created_at)
    
    console.log(itineraryDays);

  return <div>
    <section>
        <h1>Itinerary Info:</h1>
        <h2>Title: {itineraryInfo.title}</h2>
        <h2>Description: {itineraryInfo.itinerary_description}</h2>
        <h2>Username: {itineraryInfo.username}</h2>
        <h2>Date: {formattedDate}</h2>
        <h2>Budget: {itineraryInfo.budget}</h2>
        <h2>URL: {itineraryInfo.itinerary_image_url}</h2>
        <h2>Votes: {itineraryInfo.total_votes}</h2>
    </section>
    <ol>
        {itineraryDays.map((day) => (
            <li key={day.day_id}>
                <DayCard day={day} />
            </li>
        ))}
    </ol>
  </div>;
}
