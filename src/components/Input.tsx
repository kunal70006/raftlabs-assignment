import { useMutation } from "@apollo/client";
import { useState } from "react";
import { createCommentMutation } from "../graphql/mutations";
import toast from "react-hot-toast";
import useUser from "../hooks/useUser";
import Loader from "../common/Loader";
import { getCommentsByPostIDQuery } from "../graphql/queries";

const Input: React.FC<{ postID: string }> = ({ postID }) => {
  const user = useUser();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [createCommentMut] = useMutation(createCommentMutation(), {
    onCompleted() {
      setIsLoading(false);
      setComment("");
    },
    onError(error) {
      toast.error(error.message);
      setIsLoading(false);
      setComment("");
    },
  });

  async function handleCreateComment() {
    setIsLoading(true);
    await createCommentMut({
      variables: {
        authorObj: {
          author: user?.username,
          post_id: postID,
          body: comment,
          created_by: user?.id,
        },
      },
      refetchQueries: [
        {
          query: getCommentsByPostIDQuery(),
          variables: { id: parseInt(postID) },
        },
      ],
    });
  }

  return (
    <div className="flex flex-col mt-4">
      {" "}
      <input
        type="text"
        className="bg-neutral-400 rounded-lg focus:outline-none text-base pl-4 py-1 disabled:bg-neutral-800 placeholder:text-white"
        placeholder="new comment"
        value={comment}
        onChange={(ev) => setComment(ev.target.value)}
        required
      />
      {!isLoading ? (
        <button
          className="bg-blue-600 rounded-lg text-sm px-3 py-1.5 mt-2 text-white disabled:bg-red-600 disabled:cursor-not-allowed font-medium"
          disabled={comment.length === 0}
          onClick={handleCreateComment}
        >
          Post Comment
        </button>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Input;
