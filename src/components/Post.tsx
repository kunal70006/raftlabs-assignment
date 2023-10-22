import { useQuery } from "@apollo/client";
import { getCommentsByPostIDQuery } from "../graphql/queries";
import { Comment, PostCollection } from "../types";
import { toast } from "react-hot-toast";
import useLoadImage from "../hooks/usePostImage";
import moment from "moment";
import Loader from "../common/Loader";
import CommentComponent from "./Comments";

const PostComponent: React.FC<{ post: PostCollection }> = ({ post }) => {
  const imageURL = useLoadImage(post);
  const { data, loading, error } = useQuery(getCommentsByPostIDQuery(), {
    variables: {
      id: parseInt(post.id),
    },
  });

  if (error) return toast.error(error.message);

  const doesPostHaveComments = (comments: { node: Comment }[]) => {
    return comments.filter((com) => com.node.post_id === post.id).length > 0;
  };

  return (
    <div
      className="bg-neutral-600 rounded-lg text-base p-4 flex flex-col gap-2 justify-between"
      key={post.id}
    >
      <div className="grow overflow-hidden">
        <p className="text-2xl font-semibold">{post.title}</p>
        <div className="flex justify-between italic text-white/80">
          <p className="">{post.author}</p>
          <p className="">{moment(post.created_at).format("MMMM DD, YYYY")}</p>
        </div>
        {imageURL ? (
          <div className="flex items-center h-full justify-center">
            <img src={imageURL} className="object-contain" />
          </div>
        ) : (
          <div className="flex items-center h-full justify-center">
            <p className="font-semibold text-lg">No Image</p>
          </div>
        )}
      </div>
      {loading ? (
        <div className="mt-8">
          <Loader />
        </div>
      ) : null}

      {data ? (
        <div>
          {doesPostHaveComments(data.commentsCollection.edges) ? (
            <div className="mt-8 font-semibold">Comments</div>
          ) : null}
          {data.commentsCollection.edges.map(
            (comment: { node: Comment }, index: number) => (
              <CommentComponent comment={comment.node} key={index} />
            )
          )}
        </div>
      ) : null}
    </div>
  );
};

export default PostComponent;
