import { ApolloError, useQuery } from "@apollo/client";
import {
  getCommentsByPostIDQuery,
  getUserByUserIDQuery,
} from "../graphql/queries";
import type { Comment, PostProps } from "../types";
import { toast } from "react-hot-toast";
import { useState } from "react";
import useLoadImage from "../hooks/usePostImage";
import moment from "moment";
import Loader from "../common/Loader";
import CommentComponent from "./Comments";
import Input from "./Input";
import Button from "../common/Button";
import TagModal from "./TagModal";

const PostComponent: React.FC<PostProps> = ({
  post,
  enableUserToPostComments = false,
  enableTag = false,
  showTagsContainer = false,
  userID,
}) => {
  const imageURL = useLoadImage(post);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading, error } = useQuery(getCommentsByPostIDQuery(), {
    variables: {
      id: parseInt(post.id),
    },
    // dont wanna cache this
    fetchPolicy: "network-only",
  });

  const {
    data: tagData,
    loading: tagLoading,
    error: tagError,
  } = useQuery(getUserByUserIDQuery(), {
    variables: {
      id: userID,
    },
    skip: !userID,
  });

  if (error) return toast.error(error.message);

  const doesPostHaveComments = (comments: { node: Comment }[]) => {
    return comments?.filter((com) => com.node.post_id === post.id).length > 0;
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen ? (
        <TagModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          postId={parseInt(post.id)}
        />
      ) : null}
      <div className="min-h-[500px] pb-4">
        <div
          className="bg-neutral-600 rounded-lg text-base p-4 flex flex-col gap-2 justify-between h-full"
          key={post.id}
        >
          <div className="grow overflow-hidden">
            <p className="text-2xl font-semibold">{post.title}</p>
            <div className="flex justify-between italic text-white/80">
              <p className="">{post.author}</p>
              <p className="">
                {moment(post.created_at).format("MMMM DD, YYYY")}
              </p>
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

          <div>
            {doesPostHaveComments(data?.commentsCollection?.edges) ||
            enableUserToPostComments ? (
              <div className="mt-8 font-semibold">Comments</div>
            ) : null}
            {data ? (
              <div className="max-h-[100px] overflow-y-auto">
                {data?.commentsCollection?.edges.map(
                  (comment: { node: Comment }, index: number) => (
                    <CommentComponent comment={comment.node} key={index} />
                  )
                )}
              </div>
            ) : null}
            {enableUserToPostComments ? <Input postID={post.id} /> : null}
            {enableTag ? (
              <div className="flex">
                <Button className="w-full" onClick={() => setIsModalOpen(true)}>
                  Mention a user
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        {showTagsContainer ? (
          <RenderTags
            error={tagError}
            loading={tagLoading}
            usernameArr={tagData?.profilesCollection?.edges}
          />
        ) : null}
      </div>
    </>
  );
};

export default PostComponent;

const RenderTags: React.FC<{
  usernameArr: { node: { username: string } }[];
  loading: boolean;
  error: ApolloError | undefined;
}> = ({ usernameArr, error, loading }) => {
  if (error) {
    toast.error(error.message);
    return <p>Cannot load tags</p>;
  }
  if (loading) {
    return <p>Loading Tags...</p>;
  }
  return (
    <div className="flex justify-between mt-2 px-4 text-white/80 italic">
      <p className="">Tagged by</p>
      <div className="flex gap-1">
        {usernameArr?.map((u, idx) => (
          <p key={idx}>{u.node.username}</p>
        ))}
      </div>
    </div>
  );
};
