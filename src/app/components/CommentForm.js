"use client";

import { useState } from "react";
import { postComment } from "../lib/data/comments";

export default function CommentForm({ session, itineraryId, setComments }) {
  const [isPending, setIsPending] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [error, setError] = useState('');

  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };
  const handleSubmit = async () => {
    if (commentInput.length === 0) return;
    try {
      await setIsPending(true);

      const newComment = {
        commentBody: commentInput,
        itineraryId: itineraryId,
        userId: session?.user?.user_id,
      };
      console.log(newComment, "new comment");
        const postedComment = await postComment(newComment);
        console.log(postedComment, "posted");
      postedComment.username = session?.user?.username;
      setComments((comments) => [postedComment, ...comments]);
        setCommentInput("");
        setError('')
    } catch (error) {
        console.log(error);
        setError('Error when posting comment to database. Please try again.')
    } finally {
      setIsPending(false);
    }
  };
  return (
   
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      method="post"
      >
      <div className="flex flex-col justify-between items-end mb-4 rounded-xl border border-gray-300 bg-white p-5" >
      <textarea
        name="commentBody"
        placeholder={`Comment as ${session?.user?.username}`}
        value={commentInput}
        onChange={handleChange}
        className="form_input mb-4 sm:text-lg text-sm"
        maxLength={300}
          ></textarea>
          {error && <p>{error}</p>}
          <div className="h-full">

      <button
        type="submit"
        disabled={isPending}
        className="black_btn disabled:opacity-75 disabled:bg-gray-500 w-52"
        >
        {isPending ? "Loading..." : "Comment"}
      </button>
        </div>
      </div>
    </form>
  );
}
