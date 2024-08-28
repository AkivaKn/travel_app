"use client";
import { useState } from "react";
import { deleteComment, patchComment } from "../lib/data/comments";
import { dateFormatting } from "../utils/utils";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit, MdOutlineClose } from "react-icons/md";
import ErrorAlert from "./ErrorAlert";

export default function CommentCard({ session, comment, setComments }) {
  const [errors, setErrors] = useState({});
  const [editComment, setEditComment] = useState(false);
  const [commentInput, setCommentInput] = useState(comment.comment_body);
  const [isPending, setIsPending] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.comment_body);
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDeleteClick = async (event) => {
    event.target.disabled = true;
    setErrors({});
    try {
      await deleteComment(comment);
      setIsDeleted(true);
      setTimeout(() => {
        setComments((currentComments) => {
          return currentComments.filter(
            (currentComment) => currentComment.comment_id !== comment.comment_id
          );
        });
      }, 6000);
    } catch (error) {
      setErrors({ comment: "Error when deleting comment. Please try again." });
      event.target.disabled = false;
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

      updatedComment.username = session?.user?.username;
      await setCommentBody(commentInput);
      setEditComment(false);
      setErrors({});
    } catch (error) {
      setErrors({ comment: "Error editing comment. Please try again." });
    } finally {
      setIsPending(false);
    }
  };

  const handleCancelClick = () => {
    setEditComment(false);
  };

  return (
    <>
      {isDeleted ? (
        <div
          className='sm:text-lg text-sm bg-lime-100 border border-lime-400 text-lime-900 p-4 rounded-xl relative my-4'
          role='alert'>
          <span className='block sm:inline'>
            Your comment has been deleted!
          </span>
        </div>
      ) : (
        <section className=' rounded-xl border border-gray-300 bg-white p-5'>
          <div className='flex justify-between items-center mb-2'>
            <div className='flex justify-start items-center gap-3'>
              <img
                src={
                  comment.avatar_img_url
                    ? comment.avatar_img_url
                    : `https://ui-avatars.com/api?name=${comment.username}&rounded=true&background=random&size=128`
                }
                alt='Avatar Image'
                className='w-10 h-10 rounded-full object-cover'
              />
              <h1 className='sm:text-xl text-lg font-semibold'>
                {comment.username}
              </h1>
            </div>
            <p className='sm:text-lg text-sm text-gray-900 '>
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
                method='post'>
                <textarea
                  name='commentBody'
                  value={commentInput}
                  onChange={handleChange}
                  className='search_input'
                  maxLength={300}></textarea>
                <div className='flex justify-between'>
                  <button
                    type='submit'
                    disabled={isPending}
                    className='black_btn disabled:opacity-75 disabled:bg-gray-500 my-5 w-52 '>
                    {isPending ? "Loading..." : "Comment"}
                  </button>
                  <button
                    className='outline_btn my-5 w-52'
                    onClick={handleCancelClick}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className='flex justify-between items-center mb-2'>
              <p className='sm:text-lg text-sm text-gray-900'>{commentBody}</p>

              {session?.user?.user_id === comment.user_id && (
                <div>
                  <button onClick={handleEditClick}>
                    <MdOutlineModeEdit className='text-2xl mr-3 hover:text-sky-700' />
                  </button>
                  <button onClick={handleDeleteClick}>
                    <RiDeleteBin6Line className='text-2xl hover:text-red-600' />
                  </button>
                </div>
              )}
            </div>
          )}
      {errors.comment && (
        <ErrorAlert
          errors={errors}
          setErrors={setErrors}
          errorKey={"comment"}
        />
      )}
    </>
  );
}
