import { useQuery } from "@apollo/client";
import Container from "../common/Container";
import RootLayout from "../common/RootLayout";
import useUser from "../hooks/useUser";
import { getAllProfilesQuery } from "../graphql/queries";
import { toast } from "react-hot-toast";
import { UserProfile } from "../types";
import FollowUserCard from "../components/FollowUserCard";
import Grid from "../common/Grid";
import HomeFeed from "../components/HomeFeed";

const Homepage = () => {
  const user = useUser();
  const {
    data: followerSuggestions,
    loading,
    error,
  } = useQuery(getAllProfilesQuery(), {
    variables: {
      id: user?.id,
    },
    skip: !user?.id,
    fetchPolicy: "network-only",
  });

  if (error) {
    toast.error(error.message);
  }

  return (
    <RootLayout>
      <Container>
        <h1 className="text-4xl">People you might wanna follow</h1>
        <div className="flex mt-4">
          {error ? (
            <div className="flex items-center justify-center">
              Something went wrong
            </div>
          ) : null}
          {loading ? (
            <div className="flex items-center justify-center">Loading...</div>
          ) : null}
          <div className="flex items-center justify-center">
            <Grid>
              {followerSuggestions &&
                followerSuggestions.profilesCollection.edges.map(
                  (account: { node: UserProfile }, idx: number) => (
                    <FollowUserCard data={account.node} key={idx} />
                  )
                )}
            </Grid>
          </div>
        </div>
        <div className="p-8 bg-neutral-800 rounded-lg">
          <h2 className="text-2xl">Posts</h2>
          <HomeFeed />
        </div>
      </Container>
    </RootLayout>
  );
};

export default Homepage;
