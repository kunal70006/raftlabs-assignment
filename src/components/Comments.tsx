import { Comment } from "../types";
import moment from "moment";

const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <div className="flex flex-col text-left mb-2">
      <div className="flex justify-between items-center text-white/80">
        <p className="italic">
          {comment.author ? comment.author : "Anonymous"}
        </p>
        <p>{moment(comment.created_at).format("MMMM DD, YYYY")}</p>
      </div>
      <p className="word-wrap text-white underline underline-offset-4">
        {comment.body}
      </p>
    </div>
  );
};

export default CommentComponent;
