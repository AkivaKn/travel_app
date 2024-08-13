"use client";
import { useState } from "react";
import { deleteComment, patchComment } from "../lib/data/comments";
import { dateFormatting } from "../utils/utils";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit,MdOutlineClose } from "react-icons/md";

export default function CommentCard({ session, comment, setComments }) {
  const [error, setError] = useState("");
  const [editComment, setEditComment] = useState(false);
  const [commentInput, setCommentInput] = useState(comment.comment_body);
  const [isPending, setIsPending] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.comment_body);

  const handleDeleteClick = async (event) => {
    event.target.disabled = true;
    setError("");
    try {
      await deleteComment(comment);
      setComments((currentComments) => {
        return currentComments.filter(
          (currentComment) => currentComment.comment_id !== comment.comment_id
        );
      });
    } catch (error) {
      setError("Error when deleting comment. Please try again.");
      event.target.disabled = false;
      console.log(error);
    }
  };
  const handleEditClick = () => {
    setEditComment(true);
    setCommentInput(commentBody);
  };
  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (commentInput.length === 0) return;
    try {
      await setIsPending(true);
      const updatedComment = await patchComment(
        commentInput,
        comment.comment_id
      );
      console.log(updatedComment, "updated");
      updatedComment.username = session?.user?.username;
      await setCommentBody(commentInput);
      setEditComment(false);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Error editing comment. Please try again.");
    } finally {
      setIsPending(false);
    }
  };
  const handleCloseClick = () => {
    setError('')
  }
  const handleCancelClick = () => {
     setEditComment(false)
   }

  return (
    <section className="border border-gray-300 rounded-lg p-6 mb-6 shadow-lg bg-emerald-100">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">{comment.username}</h1>
        <p className="text-lg text-gray-900 ">
          {dateFormatting(comment.created_at)}
        </p>
      </div>
      {editComment ? (
        <>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
          method="post"
        >
          <textarea
            name="commentBody"
            value={commentInput}
            onChange={handleChange}
            className="search_input"
            maxLength={300}
            ></textarea>
            <div className="flex justify-between">

          <button
            type="submit"
            disabled={isPending}
            className="black_btn disabled:opacity-75 disabled:bg-gray-500 my-5 w-52 "
            >
            {isPending ? "Loading..." : "Comment"}
          </button>
        <button className="outline_btn my-5 w-52" onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
        </>
      ) : (
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg text-gray-900">{commentBody}</p>

          {session?.user?.user_id === comment.user_id && (
            <div>
              <button onClick={handleEditClick}>
                <MdOutlineModeEdit className="text-2xl mr-3 hover:text-sky-700" />
              </button>
              <button onClick={handleDeleteClick}>
                <RiDeleteBin6Line className="text-2xl hover:text-red-600" />
              </button>
            </div>
          )}
        </div>
      )}

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
          <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={handleCloseClick}>
            <MdOutlineClose/>
          </button>
</div>}
    </section>
  );
}
