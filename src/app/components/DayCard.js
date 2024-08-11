export default function DayCard({ day }) {
  return (
    <section className="border border-gray-300 rounded-lg p-6 mb-6 shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-2">Day {day.day_number}</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Day Plan:</h3>
        <p className="text-gray-700">{day.day_plan}</p>
      </div>
      {day.accommodation && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Accommodation:</h3>
          <p className="text-gray-700">{day.accommodation}</p>
        </div>
      )}
      <div className="flex justify-between items-start mb-2">
        {day.transport && (
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Transport:</h3>
            <p className="text-gray-700">{day.transport}</p>
          </div>
        )}
        <div className="flex-1 text-right">
          <h3 className="text-lg font-semibold mb-1">Location:</h3>
          <p className="text-gray-700">
            {day.place
              ? `${day.place}, ${day.region}, ${day.country}`
              : `${day.region}, ${day.country}`}
          </p>
        </div>
      </div>
    </section>
  );
}
