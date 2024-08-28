"use client";

import Link from "next/link";
import { MdOutlineModeEdit } from "react-icons/md";
import Votes from "./Votes";
import DayCard from "./DayCard";
import CommentsSection from "./CommentsSection";
import { dateFormatting, formatBudget } from "../utils/utils";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRef, useState } from "react";
import { deleteItinerary } from "../lib/data/itineraries";
import { useRouter } from "next/navigation";

export default function FullItinerary({ itinerary, session }) {
  const modalRef = useRef();
  const [dialogError, setDialogError] = useState("");
  const { itineraryInfo, itineraryDays, itineraryComments } = itinerary;
  const formattedDate = dateFormatting(itineraryInfo.created_at);
  const formattedBudget = formatBudget(itineraryInfo.budget);
  const router = useRouter();


  const handleDeleteClick = () => {
    const modalElement = modalRef.current;
    modalElement.showModal();
  };

  const handleDelete = async (event) => {
    event.target.disabled = true;
    setDialogError("");
    try {
      await deleteItinerary(itineraryInfo.itinerary_id);
      router.replace("/");
    } catch (error) {
      setDialogError("Error when deleting itinerary. Please try again.");
      event.target.disabled = false;
      console.log(error);
    }
  };

  const cancelDelete = () => {
    const modalElement = modalRef.current;
    modalElement.close();
    setDialogError("");
  };
  
  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-center text-3xl mx-auto head_text">
          {itineraryInfo.title}
        </h1>

        <section className="w-full max-w-5xl flex flex-col glassmorphism mt-10">
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
              <p className=" text-gray-700 mx-2 sm:text-lg text-sm mb-2">
                Posted by{" "}
                <span className="font-bold">{itineraryInfo.username}</span> on{" "}
                <span className="font-bold">{formattedDate}</span>
              </p>
              {session?.user?.user_id === itineraryInfo.user_id && (
                <div className=" flex items-center">
                  <Link
                    href={`/itinerary/update/${itineraryInfo.itinerary_id}`}
                  >
                    <MdOutlineModeEdit className=" text-2xl mr-3 hover:text-sky-700" />
                  </Link>
                  <button onClick={handleDeleteClick}>
                    <RiDeleteBin6Line className="text-2xl hover:text-red-600" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-700 mx-2 mb-4 sm:text-lg text-sm">
            {itineraryInfo.itinerary_description}
          </p>
          <div className="flex justify-between mx-2">
            <div className="flex items-center">
              <h2 className="sm:text-lg text-sm font-semibold mr-2">Budget:</h2>
              <p className="text-gray-700 sm:text-lg text-sm">
                <span className="font-bold">{formattedBudget}</span>
              </p>
            </div>
            <Votes
              itineraryInfo={itineraryInfo}
              session={session}
            />
          </div>
        </section>
        <h1 className="mt-5 text-3xl text-center mb-5 font-extrabold leading-[1.15] text-black sm:text-4xl ">Days</h1>
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
      <dialog
        ref={modalRef}
        className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
      >
        
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <button
            type="button"
            onClick={cancelDelete}
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <svg
            className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="mb-4 text-gray-500 dark:text-gray-300">
            Are you sure you want to delete this item?
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={cancelDelete}
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
            <button
              onClick={handleDelete}
              type="submit"
              className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              {` Yes, I'm sure`}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
