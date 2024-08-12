"use client"
import { useState } from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

export default function CommentsSection({ itineraryComments, session, itineraryId }) {
    const [comments, setComments] = useState(itineraryComments);

    return (
        <div>
            <h1 className="text-2xl font-bold my-6">Comments</h1>
      {session?.user &&
                <CommentForm session={session} itineraryId={itineraryId} setComments={setComments} />
    }
      <ol className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <CommentCard comment={comment} />
          </li>
        ))}
      </ol>
        </div>
    )
}