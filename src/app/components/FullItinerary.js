"use client";

import Link from "next/link";
import { MdOutlineModeEdit } from "react-icons/md";
import Votes from "./Votes";
import DayCard from "./DayCard";
import CommentsSection from "./CommentsSection";
import { dateFormatting, formatBudget } from "../utils/utils";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function FullItinerary({ itinerary, session }) {
  const { itineraryInfo, itineraryDays, itineraryComments } = itinerary;
  const formattedDate = dateFormatting(itineraryInfo.created_at);
  const formattedBudget = formatBudget(itineraryInfo.budget);
  const handleDeleteClick = () => {};
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center text-3xl mx-auto head_text">
        {itineraryInfo.title}
      </h1>

      <section className="w-full max-w-5xl flex flex-col glassmorphism my-10">
        <div>
          <img
            src={
              itineraryInfo.itinerary_image_url
                ? itineraryInfo.itinerary_image_url
                : "/assets/images/beach-picture.png"
            }
            alt="Itinerary Image"
            className="w-full h-auto rounded-lg shadow-md object-scale-down mb-4"
          />
          <div className="flex justify-between">
            <p className=" text-gray-700 mx-2 text-lg mb-2">
              Posted by{" "}
              <span className="font-bold">{itineraryInfo.username}</span> on{" "}
              <span className="font-bold">{formattedDate}</span>
            </p>
            {session?.user?.user_id === itineraryInfo.user_id && (
              <div>
                <Link href={`/itinerary/update/${itineraryInfo.itinerary_id}`}>
                  <MdOutlineModeEdit className="text-2xl mr-3 hover:text-sky-700" />
                </Link>
                <button onClick={handleDeleteClick}>
                  <RiDeleteBin6Line className="text-2xl hover:text-red-600" />
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-700 mx-2 mb-4 text-lg">
          {itineraryInfo.itinerary_description}
        </p>
        <div className="flex justify-between mx-2">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold mr-2">Budget:</h2>
            <p className="text-gray-700 text-lg">
              <span className="font-bold">{formattedBudget}</span>
            </p>
          </div>
          <Votes
            userId={session?.user?.user_id}
            itineraryInfo={itineraryInfo}
            session={session}
          />
        </div>
      </section>
      <h1 className="text-3xl font-bold mb-4 ">Days</h1>
      <ol className="space-y-4">
        {itineraryDays.map((day) => (
          <li key={day.day_id}>
            <DayCard day={day} />
          </li>
        ))}
      </ol>
      <CommentsSection
        itineraryComments={itineraryComments}
        session={session}
        itineraryId={itineraryInfo.itinerary_id}
      />
    </div>
  );
}
