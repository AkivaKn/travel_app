"use server"
import { sql } from "@vercel/postgres";

export async function postComment({userId,itineraryId,commentBody}) {
    const comment_res = await sql`
    INSERT INTO comments 
    (user_id, itinerary_id, comment_body)
    VALUES (${userId}, ${itineraryId}, ${commentBody})
    RETURNING *`;

    return comment_res.rows[0];
}
