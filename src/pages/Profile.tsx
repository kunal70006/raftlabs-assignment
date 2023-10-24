import { useEffect, useState } from "react";
import RootLayout from "../common/RootLayout";
import useUser from "../hooks/useUser";
import { Post, PostCollection, UserProfile } from "../types";
import { useMutation, useQuery } from "@apollo/client";
import {
  createPostMutation,
  updateProfileMutation,
} from "../graphql/mutations";
import uniqid from "uniqid";
import Loader from "../common/Loader";
import { SupabaseClient } from "../clients/Supabase.client";
import toast from "react-hot-toast";
import { getPostsByUserIDQuery } from "../graphql/queries";
import PostComponent from "../components/Post";
import Container from "../common/Container";
import Grid from "../common/Grid";
import SubContainer from "../common/SubContainer";

const DEFAULT_POST = {
  author: "",
  media_path: "",
  title: "",
  user_id: "",
} as const;

const DEFAUL_USER: UserProfile = {
  follower_count: 0,
  following: null,
  id: "",
  username: "",
  updated_at: null,
} as const;

const Profile = () => {
  const supaUser = useUser();
  const [user, setUser] = useState<UserProfile>(DEFAUL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatePostUploadInProgress, setIsCreatePostUploadInProgress] =
    useState(false);
  const [newPost, setNewPost] = useState<Post>(DEFAULT_POST);

  const {
    data: postData,
    loading,
    error,
    refetch,
  } = useQuery(getPostsByUserIDQuery(), {
    variables: {
      id: user?.id,
    },
    skip: !user?.id,
  });

  const [updateProfile] = useMutation(updateProfileMutation(), {
    variables: {
      updatedInfo: user,
      id: user?.id,
    },
    onCompleted() {
      setIsLoading(false);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const [createPostMut] = useMutation(createPostMutation(), {
    variables: {
      postData: [newPost],
    },
    onCompleted() {
      setNewPost(DEFAULT_POST);
      setIsCreatePostUploadInProgress(false);
      refetch();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (supaUser) {
      setUser(supaUser);
      setNewPost((p) => ({
        ...p,
        author: supaUser.username!,
        user_id: supaUser.id!,
      }));
      if (!supaUser.username) {
        toast("Please add a username");
      }
    }
  }, [supaUser]);

  async function handleProfileUpdate() {
    setIsLoading(true);
    await updateProfile();
  }

  async function handleCreatePostChange(
    ev: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value, files } = ev.target;

    if (name === "media_path") {
      if (files) {
        setIsCreatePostUploadInProgress(true);
        const imagePath = await uploadImage(files[0]);
        setNewPost((p) => ({ ...p, media_path: imagePath }));
        setIsCreatePostUploadInProgress(false);
      }
    } else {
      setNewPost((p) => ({ ...p, [name]: value }));
    }
  }

  async function uploadImage(obj: File) {
    const id = uniqid();
    const { data, error } = await SupabaseClient.storage
      .from("post_media")
      .upload(`image-${id}`, obj, { cacheControl: "3600", upsert: false });
    if (error) {
      toast.error("Image upload failed");
    }
    if (!data) {
      toast.error("Something went wrong");
    }
    return data!.path!;
  }

  async function handleCreatePost() {
    setIsCreatePostUploadInProgress(true);
    await createPostMut();
  }

  if (!supaUser || loading) return <RootLayout>Loading...</RootLayout>;
  if (error) return toast.error(error.message);

  return (
    <RootLayout>
      <Container>
        <div>
          <h1 className="text-4xl">Profile</h1>
        </div>
        <SubContainer>
          <h2 className="text-2xl">Personal Information</h2>
          <div className="flex gap-4 items-baseline mt-2">
            <p className="mt-4">Username:</p>
            <input
              type="text"
              className="bg-neutral-600 rounded-lg focus:outline-none text-base pl-4 py-1 disabled:bg-neutral-800"
              value={user?.username ? user.username : ""}
              onKeyDown={(ev) => {
                if (ev.key === " ") {
                  ev.preventDefault();
                }
              }}
              onChange={(ev) =>
                setUser((u) => ({ ...u, username: ev.target.value }))
              }
            />
          </div>
          <div className="flex gap-4 items-baseline">
            <p className="mt-4">following: {user?.follower_count}</p>
          </div>
          {!isLoading ? (
            <button
              className="bg-blue-600 rounded-lg text-sm px-3 py-1.5 mt-4 text-white disabled:bg-red-600 disabled:cursor-not-allowed font-medium"
              disabled={!user?.username}
              onClick={() => handleProfileUpdate()}
            >
              Update
            </button>
          ) : (
            <Loader />
          )}
        </SubContainer>

        <SubContainer>
          <h2 className="text-2xl">Create Post</h2>
          <div className="flex gap-4 items-baseline mt-2">
            <p className="mt-4">Title:</p>
            <input
              type="text"
              className="bg-neutral-600 rounded-lg focus:outline-none text-base pl-4 py-1 disabled:bg-neutral-800"
              value={newPost.title}
              name="title"
              onChange={handleCreatePostChange}
              required
            />
            <p className="mt-4">Image:</p>
            <input
              type="file"
              className="bg-neutral-600 rounded-lg focus:outline-none text-base pl-4 py-1 disabled:bg-neutral-800"
              accept="image/*"
              name="media_path"
              onChange={handleCreatePostChange}
            />
          </div>
          {!isCreatePostUploadInProgress ? (
            <button
              className="bg-blue-600 rounded-lg text-sm px-3 py-1.5 mt-4 text-white disabled:bg-red-600 disabled:cursor-not-allowed font-medium"
              disabled={newPost.title.length === 0}
              onClick={handleCreatePost}
            >
              Create
            </button>
          ) : (
            <Loader />
          )}
        </SubContainer>

        <SubContainer>
          <h2 className="text-2xl">All Posts</h2>
          <Grid>
            {postData &&
              postData.postsCollection.edges.map(
                (post: { node: PostCollection }, index: number) => (
                  <PostComponent post={post.node} key={index} />
                )
              )}
          </Grid>
        </SubContainer>
      </Container>
    </RootLayout>
  );
};

export default Profile;
