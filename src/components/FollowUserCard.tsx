import { useMutation } from "@apollo/client";
import { UserProfile } from "../types";
import {
  updateFollowerCountMutation,
  updateFollowersMutation,
} from "../graphql/mutations";
import { twMerge } from "tailwind-merge";
import useUser from "../hooks/useUser";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { getAllProfilesQuery } from "../graphql/queries";
import { useNavigate } from "react-router-dom";
import SubContainer from "../common/SubContainer";

const FollowUserCard: React.FC<{
  data: UserProfile;
}> = ({ data }) => {
  const user = useUser();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const isUserFollowing = user?.following?.includes(data!.id!);

  const [handleUpdateFollowerCountMut] = useMutation(
    updateFollowerCountMutation(),
    {
      refetchQueries: [
        {
          query: getAllProfilesQuery(),
          variables: { id: user?.id },
          fetchPolicy: "network-only",
        },
      ],
    }
  );

  const [handleFollowersMut] = useMutation(updateFollowersMutation(), {
    onCompleted() {
      setToggle((t) => !t);
    },
    onError(error) {
      toast.error(error.message);
    },
    fetchPolicy: "network-only",
  });

  async function handleFollowChange() {
    if (isUserFollowing) {
      const newFollowers = user?.following?.filter((f) => f !== data.id);
      await handleFollowersMut({
        variables: { id: user?.id, following: newFollowers },
      }).then(() => {
        handleUpdateFollowerCountMut({
          variables: {
            id: data.id,
            follower_count: data!.follower_count! - 1,
          },
        });
        navigate(0);
      });
    } else {
      const newFollowers = user?.following
        ? [...user.following, data.id]
        : [data.id];
      await handleFollowersMut({
        variables: { id: user?.id, following: newFollowers },
      }).then(() => {
        console.log(data, "then");
        handleUpdateFollowerCountMut({
          variables: {
            id: data.id,
            follower_count: data!.follower_count! + 1,
          },
        });
        navigate(0);
      });
    }
  }

  return (
    <SubContainer className="flex xl:w-[20vw] lg:w-[25vw] w-[90vw] md:w-[45vw] flex-col">
      <div className="flex justify-between w-ful text-lg">
        <p className="">{data.username}</p>
        <p className="">{data.follower_count}</p>
      </div>
      <button
        className={twMerge(
          "bg-blue-600 rounded-lg text-sm px-3 py-1.5 mt-4 text-white font-medium hover:bg-blue-800",
          isUserFollowing || toggle ? "bg-red-600 hover:bg-red-800" : null
        )}
        onClick={handleFollowChange}
      >
        {isUserFollowing || toggle ? "Unfollow" : "Follow"}
      </button>
    </SubContainer>
  );
};

export default FollowUserCard;
