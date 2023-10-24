import { useQuery } from "@apollo/client";
import useUser from "../hooks/useUser";
import { getAllPostsQuery } from "../graphql/queries";
import { useState } from "react";
import { PostCollection } from "../types";
import toast from "react-hot-toast";
import PostComponent from "./Post";
import Grid from "../common/Grid";

const HomeFeed = () => {
  const user = useUser();

  const [feedData, setFeedData] = useState<PostCollection[]>([]);

  const { loading, error } = useQuery(getAllPostsQuery(), {
    skip: !user?.id,
    onCompleted(data) {
      const arr: PostCollection[] = [];
      data.postsCollection.edges.map((post: { node: PostCollection }) => {
        if (user?.following?.includes(post.node.user_id)) {
          arr.push({ ...post.node });
        }
      });
      setFeedData(arr);
    },
    fetchPolicy: "network-only",
  });

  if (error) {
    toast.error(error.message);
    return <p>Something went wrong</p>;
  }

  if (loading) return <p>Loading...</p>;

  if (feedData.length === 0)
    return (
      <p className="text-lg mt-4">
        No Posts found, follow someone to see their posts
      </p>
    );

  return (
    <Grid className="xl:grid-cols-3 lg:grid-cols-2 gap-24">
      {feedData?.map((post, idx) => (
        <PostComponent
          post={post}
          key={idx}
          enableUserToPostComments
          enableTag
        />
      ))}
    </Grid>
  );
};

export default HomeFeed;
