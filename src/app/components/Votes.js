"use client";
import React, { useEffect, useState } from "react";
import { checkVote, deleteVote, postVote } from "../lib/data/itinerary_votes";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";

export default function Votes({ itineraryInfo, session }) {
  const userId = session?.user?.user_id;
  const itineraryId = itineraryInfo.itinerary_id;
  const actualVoteCount = itineraryInfo.total_votes;
  const [displayedVoteCount, setDisplayedVoteCount] = useState(actualVoteCount);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

  useEffect(() => {
    const getVoteValue = async () => {
      if (session) {
        const voteValue = await checkVote(session, itineraryId);
        switch (voteValue) {
          case 1:
            setUpvote(true);
            break;
          case -1:
            setDownvote(true);
            break;
        }
      }
    };
    getVoteValue();
  }, []);

  async function handleUpvoteClick() {
    try {
      if (upvote) {
        await deleteVote(session, itineraryId);
        setUpvote(false);
        setDisplayedVoteCount((currentVoteCount) => {
          return currentVoteCount - 1;
        });
      } else if (downvote) {
        await deleteVote(session, itineraryId);
        setDownvote(false);
        await postVote(userId, itineraryId, 1);
        setUpvote(true);
        setDisplayedVoteCount((currentVoteCount) => {
          return currentVoteCount + 2;
        });
      } else {
        await postVote(userId, itineraryId, 1);
        setUpvote(true);
        setDisplayedVoteCount((currentVoteCount) => {
          return currentVoteCount + 1;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDownvoteClick() {
    try {
      if (downvote) {
        await deleteVote(session, itineraryId);
        setDownvote(false);
        setDisplayedVoteCount((currentVoteCount) => {
          return currentVoteCount + 1;
        });
      } else if (upvote) {
        await deleteVote(session, itineraryId);
        setUpvote(false);
        await postVote(userId, itineraryId, -1);
        setDownvote(true);
        setDisplayedVoteCount((currentVoteCount) => {
          return currentVoteCount - 2;
        });
      } else {
        await postVote(userId, itineraryId, -1);
        setDownvote(true);
        setDisplayedVoteCount((currentVoteCount) => {
          return currentVoteCount - 1;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex gap-4">
      {session && (
        <>
          <button
            onClick={() => {
              handleUpvoteClick();
            }}
          >
            {upvote ? <FaThumbsUp /> : <FaRegThumbsUp />}
          </button>
          <button
            onClick={() => {
              handleDownvoteClick();
            }}
          >
            {downvote ? <FaThumbsDown /> : <FaRegThumbsDown />}
          </button>
        </>
      )}
      <div className="flex items-center">
        <h2 className="sm:text-lg text-sm font-semibold mr-2">Votes:</h2>
        <p className="sm:text-lg text-sm text-gray-700">
          <span className="font-bold sm:text-lg text-sm">{displayedVoteCount}</span>
        </p>
      </div>
    </div>
  );
}
