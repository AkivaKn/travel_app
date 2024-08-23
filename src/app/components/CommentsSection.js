"use client"
import { useState } from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

export default function CommentsSection({ itineraryComments, session, itineraryId }) {
    const [comments, setComments] = useState(itineraryComments);

    return (
        <div>
            <h1 className="text-center mt-5 mb-5 text-3xl font-extrabold leading-[1.15] text-black sm:text-4xl">
          Comments
        </h1>
      {session?.user &&
                <CommentForm session={session} itineraryId={itineraryId} setComments={setComments} />
    }
      <ol className="space-y-4">
        {comments.map((comment, index) => (
          <li key={comment.comment_id}>
            <CommentCard session={session} comment={comment} setComments={setComments} index={index} />
          </li>
        ))}
      </ol>
        </div>
    )
}