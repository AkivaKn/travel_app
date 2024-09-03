"use client";
import { useState, useEffect } from "react";
import ItinerariesList from "./ItinerariesList";
import { getItineraries } from "../lib/data/itineraries";

export default function UserDetails({ user, userId }) {
  const [itineraries, setItineraries] = useState([]);
  useEffect(() => {
    const fetchItineraries = async () => {
      const itineraries = await getItineraries(undefined, userId);
      setItineraries(itineraries);
    };
    fetchItineraries();
  }, []);
  return (
    <div
      className={`w-full ${
        itineraries.length > 0 && `md:grid grid-cols-3`
      } md:p-8`}
    >
      <div className="flex flex-col justify-center items-center my-8 md:h-[80vh]">
        <img
          className="xl:w-48 xl:h-48 md:w-40 md:h-40 w-48 h-48 rounded-full object-cover my-3 mx-3"
          src={
            user?.avatar_img_url
              ? user?.avatar_img_url
              : `https://ui-avatars.com/api?name=${user?.username}&rounded=true&background=random`
          }
          alt="user profile image"
        />
        <h1 className="sm:text-xl text-lg font-semibold my-3 mx-3">
          {user?.username}
        </h1>
        <p className="lg:text-lg text-sm text-gray-900 my-3 mx-10 md:mx-3 text-center">
          {user?.bio}
        </p>
      </div>
      {itineraries.length > 0 && (
        <div className="col-start-2 col-span-2 justify-center items-center md:bg-white md:rounded-xl md:shadow-lg">
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.15] text-black text-center">
            Itineraries:
          </h1>
          <ItinerariesList itineraries={itineraries} />
        </div>
      )}
    </div>
  );
}
