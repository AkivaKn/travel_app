"use server";
import { sql } from "@vercel/postgres";

export async function postVote(userId, itineraryId, voteValue) {
  try {
    const vote_res = await sql`    
            INSERT INTO itinerary_votes (user_id, itinerary_id, vote_value)
            VALUES (${userId}, ${itineraryId}, ${voteValue})
            RETURNING *
            `;
    return vote_res;
  } catch (error) {
    console.error("Error posting vote", error);
    return error;
  }
}

export async function checkVote(session, itineraryId) {
  const userId = session?.user?.user_id;
  
  try {
    const checkRes = await sql` 
      SELECT * FROM itinerary_votes 
      WHERE user_id = ${userId} 
      AND itinerary_id = ${itineraryId} 
      `;
        
    if (checkRes.rows.length === 0) {
      return 0;
    }
    return checkRes.rows[0].vote_value;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteVote(session, itineraryId) {
  const userId = session?.user?.user_id;
  try {
    const deletedVote = await sql`
        DELETE FROM itinerary_votes
        WHERE itinerary_id = ${itineraryId}
        AND user_id = ${userId}
        RETURNING *`;
    if (deletedVote.rows.length === 0) {
      throw new Error();
    }
    return deletedVote.rows[0];
  } catch (error) {
    console.log("error");
    return error;
  }
}
