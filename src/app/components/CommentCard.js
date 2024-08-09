import { dateFormatting} from "../utils/utils"

export default function CommentCard({comment}) {
    return <section className="border-2 border-black p-2 m-2">
        <h1>{comment.username}</h1>
        <h1>{comment.comment_body}</h1>
        <h1>{dateFormatting(comment.created_at)}</h1>
    </section>
}