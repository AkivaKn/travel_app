"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { postVote } from "../lib/data/itinerary_votes";



export default function Votes({userId, itineraryInfo, session}) {
    const itineraryId = itineraryInfo.itinerary_id
    const actualVoteCount = itineraryInfo.total_votes
    const [voteValue, setVoteValue] = useState(0)
    const [displayedVoteCount, setDisplayedVoteCount] = useState(actualVoteCount)
    const [disabledButtons, setDisabledButtons] = useState([false,false]); //i.e. both buttons are initially not disabled
   
    useEffect(()=>{
        if (session){
            const writeVote = async ()=>{
                await postVote(userId, itineraryId, voteValue)
                console.log(voteValue, "<-- voteValue")
            }       
            writeVote()
        }
    },[displayedVoteCount])

    function handleClick(increment, button_index){
        const incrementedVoteCount = displayedVoteCount + increment
        setDisplayedVoteCount(incrementedVoteCount);
        setVoteValue(increment)
       
        if (
        (incrementedVoteCount > actualVoteCount && button_index === 0) ||
        (incrementedVoteCount < actualVoteCount && button_index === 1)
        ) {
        setDisabledButtons(disabledButtons.map((_, i) =>i===button_index));
        } else {
        setDisabledButtons([false, false]);
    }
    }

  return (
    <div className="flex gap-4">
    {session &&
    <>
      <button 
      disabled = {disabledButtons[0]}
      onClick = {()=>{handleClick(1,0)}}>
        <Image alt="thumbs up" src="/assets/icons/thumbs up.jpg" width={30} height={30} />
      </button>
      <button 
        disabled={disabledButtons[1]}
        onClick = {()=>{handleClick(-1,1)}}>
        <Image alt="thumbs down" src="/assets/icons/thumbs down.jpg" width={30} height={30} />
      </button>
    </>
    }
      <div className='flex items-center'>
            <h2 className='text-lg font-semibold mr-2'>Votes:</h2>
            <p className='text-lg text-gray-700'>
              <span className='font-bold'>{displayedVoteCount}</span>
            </p>
          </div>
    </div>
  );
}
