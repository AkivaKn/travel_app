"use server";
import { sql } from "@vercel/postgres";

export async function postVote(userId, itineraryId, voteValue) {
  try {
    const vote_res = await sql `    
            INSERT INTO itinerary_votes (user_id, itinerary_id, vote_value)
            VALUES (${userId}, ${itineraryId}, ${voteValue})
            RETURNING *
            `;
    return vote_res;
  } catch (error) {
    console.error("Error posting vote", error);
  }
}
