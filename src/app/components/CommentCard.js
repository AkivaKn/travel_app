import { dateFormatting } from "../utils/utils";

export default function CommentCard({ comment }) {
  return (
    <section className="border border-gray-300 rounded-lg p-6 mb-6 shadow-lg bg-emerald-100">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">{comment.username}</h1>
        <p className="text-lg text-gray-900 text-right">
          {dateFormatting(comment.created_at)}
        </p>
      </div>
      <p className="text-lg text-gray-900">{comment.comment_body}</p>
    </section>
  );
}
