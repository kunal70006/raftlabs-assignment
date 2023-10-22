import { useQuery } from "@apollo/client";
import useUser from "../hooks/useUser";
import { getAllPostsQuery } from "../graphql/queries";

const HomeFeed = () => {
  const user = useUser();
  const { data } = useQuery(getAllPostsQuery(), {
    skip: !user?.id,
  });
  console.log(data);

  return <div></div>;
};

export default HomeFeed;
