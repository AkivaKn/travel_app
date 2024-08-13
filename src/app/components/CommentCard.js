"use client"
import { useState } from "react";
import { deleteComment } from "../lib/data/comments";
import { dateFormatting } from "../utils/utils";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CommentCard({ session, comment, setComments }) {
  const [error, setError] = useState("")
  const handleClick = async (event) => {
    event.target.disabled = true;
    setError("")
    try {
      await deleteComment(comment);
      setComments((currentComments) => {
        return currentComments.filter(
          (currentComment) => currentComment.comment_id !== comment.comment_id
        );
      });
    } catch (error) {
      setError("Error when deleting comment. Please try again.")
      event.target.disabled = false
      console.log(error);
    }
  };

  return (
    <section className="border border-gray-300 rounded-lg p-6 mb-6 shadow-lg bg-emerald-100">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">{comment.username}</h1>
        <p className="text-lg text-gray-900 ">
          {dateFormatting(comment.created_at)}
        </p>
      </div>
      <div className="flex justify-between items-center mb-2">
      <p className="text-lg text-gray-900">{comment.comment_body}</p>
      {session?.user?.user_id === comment.user_id && (
        <button onClick={handleClick}>
          <RiDeleteBin6Line className="text-2xl hover:text-red-600" />
        </button>
      )}
      </div>
      {error && <p>{error}</p>}
    </section>
  );
}
