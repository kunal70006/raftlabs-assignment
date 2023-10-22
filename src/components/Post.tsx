import useLoadImage from "../hooks/usePostImage";
import { PostCollection } from "../types";
import moment from "moment";

const PostComponent: React.FC<{ post: PostCollection }> = ({ post }) => {
  const imageURL = useLoadImage(post);
  return (
    <div
      className="bg-neutral-600 rounded-lg text-base p-4 flex flex-col gap-2"
      key={post.id}
    >
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
  );
};

export default PostComponent;
