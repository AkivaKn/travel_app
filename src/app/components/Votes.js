"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { postVote } from "../lib/data/itinerary_votes";



export default function Votes({userId, itineraryInfo}) {
    const itineraryId = itineraryInfo.itinerary_id

    const actualVoteCount = itineraryInfo.total_votes
    const [voteValue, setVoteValue] = useState(0)
    const [displayedVoteCount, setDisplayedVoteCount] = useState(actualVoteCount)
    const [disabledButtonsLogic, setdisabledButtonsLogic] = useState([false,false]); //i.e. both buttons are initially not disabled
   
    useEffect(()=>{
        const writeVote = async ()=>{
            const postedVote = await postVote(userId, itineraryId, voteValue)
        }       
        writeVote()
    },[userId, itineraryId, voteValue])

    function handleClick(increment, button_index){
        const incrementedVoteCount = displayedVoteCount + increment
        setDisplayedVoteCount(incrementedVoteCount);
        let disabledButtonsLogicCopy = [...disabledButtonsLogic];
        if (
        (incrementedVoteCount < actualVoteCount && button_index === 1) ||
        (incrementedVoteCount > actualVoteCount && button_index === 0)
        ) {
        setVoteValue(increment)
        disabledButtonsLogicCopy[button_index] = true;
        } else {
        setVoteValue(0)
        disabledButtonsLogicCopy = [false, false];
    }
    setdisabledButtonsLogic(disabledButtonsLogicCopy)
    }

  return (
    <div className="flex gap-4">
      <button 
      disabled = {disabledButtonsLogic[0]}
      onClick = {()=>{handleClick(1,0)}}>
        <Image alt="thumbs up" src="/assets/icons/thumbs up.jpg" width={30} height={30} />
      </button>
      <button 
        disabled={disabledButtonsLogic[1]}
        onClick = {()=>{handleClick(-1,1)}}>
        <Image alt="thumbs down" src="/assets/icons/thumbs down.jpg" width={30} height={30} />
      </button>
      <div className='flex items-center'>
            <h2 className='text-lg font-semibold mr-2'>Votes:</h2>
            <p className='text-lg text-gray-700'>
              <span className='font-bold'>{displayedVoteCount}</span>
            </p>
          </div>
    </div>
  );
}
