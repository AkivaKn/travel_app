"use client";

import { useState } from "react";
import { postComment } from "../lib/data/comments";

export default function CommentForm({ session, itineraryId, setComments }) {
  // const [isPending, setIsPending] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  // console.log(session?.user);
  // async function createComment(formData) {
  //     setIsPending(true);
  //     const newComment = {
  //         commentBody: formData.get('commentBody'),
  //         itineraryId: itineraryId,
  //         userId: session?.user?.user_id
  //     }
  //     if (newComment.commentBody.length === 0) return;
  //     const postedComment = await postComment(newComment);
  //     postedComment.username = session?.user?.username;
  //     setComments((comments) => [postedComment, ...comments]);
  //     setIsPending(false);
  //     console.log(postedComment);
  // }

  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    console.log(e, "event");
    e.preventDefault();
    e.target.disabled = true;
    const newComment = {
      commentBody: commentInput,
      itineraryId: itineraryId,
      userId: session?.user?.user_id,
    };
    console.log(newComment, "new comment");
    if (newComment.commentBody.length === 0) return;
    const postedComment = await postComment(newComment);
    postedComment.username = session?.user?.username;
    console.log(postedComment, "posted");
    setComments((comments) => [postedComment, ...comments]);
    e.target.disabled = false;
    setCommentInput("");
    console.log(postedComment);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="commentBody"
        placeholder={`Comment as ${session?.user?.username}`}
        value={commentInput}
        onChange={handleChange}
      />
      <button type="submit" className="disabled:border-2">
        Comment
      </button>
    </form>
  );
}
