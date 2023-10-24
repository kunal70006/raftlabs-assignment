import { useQuery } from "@apollo/client";
import Container from "../common/Container";
import RootLayout from "../common/RootLayout";
import Title from "../common/Title";
import useUser from "../hooks/useUser";
import { getTagsByUserIDQuery } from "../graphql/queries";
import toast from "react-hot-toast";
import SubContainer from "../common/SubContainer";
import { TaggedPost } from "../types";
import PostComponent from "../components/Post";
import Grid from "../common/Grid";

const Tags = () => {
  const user = useUser();
  const { data, loading, error } = useQuery(getTagsByUserIDQuery(), {
    variables: {
      username: user?.username,
    },
    skip: !user?.username,
  });

  if (loading)
    return (
      <RootLayout>
        <Container>loading...</Container>
      </RootLayout>
    );

  if (error) {
    toast.error(error.message);
    return (
      <RootLayout>
        <Container>Something went wrong.</Container>
      </RootLayout>
    );
  }

  if ((data && data?.tagsCollection?.edges?.length === 0) || !data) {
    return (
      <RootLayout>
        <Container>No Tagged Posts</Container>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <Container>
        <Title>Tags</Title>
        <SubContainer className="mt-4">
          <h2 className="text-2xl">Tagged Posts</h2>
          <Grid className="mt-4">
            {data &&
              data?.tagsCollection?.edges?.map(
                (post: { node: TaggedPost }, idx: number) => (
                  <div key={idx}>
                    <PostComponent post={post.node.posts} key={idx} />
                    <div className="flex justify-between mt-2 px-4 text-white/80 italic">
                      <p className="">Tagged by</p>
                      <p className="">{post.node.profiles.username}</p>
                    </div>
                  </div>
                )
              )}
          </Grid>
        </SubContainer>
      </Container>
    </RootLayout>
  );
};

export default Tags;
