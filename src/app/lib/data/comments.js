"use server";
import { sql } from "@vercel/postgres";
import { auth } from "../../../../auth";

export async function postComment({ userId, itineraryId, commentBody }) {
  const session = await auth();

  try {
    if (!session?.user) {
      throw new Error();
    }
    const comment_res = await sql`
        INSERT INTO comments 
        (user_id, itinerary_id, comment_body)
        VALUES (${userId}, ${itineraryId}, ${commentBody})
        RETURNING *`;

    return comment_res.rows[0];
  } catch (error) {
    return error;
  }
}

export async function deleteComment({ comment_id }) {
  const session = await auth();
  const currentUserId = session?.user?.user_id;

  try {
    const deletedComment = await sql`
        DELETE FROM comments
        WHERE comment_id = ${comment_id}
        AND user_id = ${currentUserId}
        RETURNING *`;

    if (deletedComment.rows.length === 0) {
      throw new Error();
    }
    return deletedComment.rows[0];
  } catch (error) {
    return error;
  }
}

export async function patchComment(commentBody, commentId) {
  try {
    const comment_res = await sql`
        UPDATE comments 
        SET comment_body = ${commentBody}
        WHERE comment_id = ${commentId}
        RETURNING *`;
    return comment_res.rows[0];
  } catch (error) {
    return error;
  }
}
