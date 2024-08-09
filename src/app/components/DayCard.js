
export default function DayCard({day}) {
    return <section className="border-2 border-black p-2 m-2">
        <h2>Day {day.day_number}</h2>
        <h2>Day Plan: {day.day_plan}</h2>
        {day.accomodation && <h2>Accomodation: {day.accomodation}</h2>}
        {day.transport && <h2>Transport: {day.transport}</h2>}
        {day.place ? <h2>Location: {day.place}, {day.region}, {day.country}</h2> : <h2>Location: {day.region}, {day.country}</h2>}
    </section>
}