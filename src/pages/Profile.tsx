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
import toast from "react-hot-toast/headless";
import { getPostsByUserIDQuery } from "../graphql/queries";
import PostComponent from "../components/Post";

const DEFAULT_POST = {
  author: "",
  media_path: "",
  title: "",
  user_id: "",
} as const;

const Profile = () => {
  const supaUser = useUser();
  const [user, setUser] = useState<null | UserProfile>(null);
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
      <div className="bg-neutral-900 mt-12 lg:mx-24 text-white rounded-lg p-8 flex flex-col gap-12">
        <div>
          <h1 className="text-4xl">Profile</h1>
        </div>
        <div className="bg-neutral-800 rounded-lg p-8">
          <h2 className="text-2xl">Personal Information</h2>
          <div className="flex gap-4 items-baseline mt-2">
            <p className="mt-4">Username:</p>
            <input
              type="text"
              className="bg-neutral-600 rounded-lg focus:outline-none text-base pl-4 py-1 disabled:bg-neutral-800"
              value={user?.username ? user.username : ""}
              onChange={(ev) =>
                setUser((u) => ({ ...u, username: ev.target.value }))
              }
            />
          </div>
          <div className="flex gap-4 items-baseline">
            <p className="mt-4">Followers: {user?.follower_count}</p>
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
        </div>

        <div className="bg-neutral-800 rounded-lg p-8">
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
        </div>

        <div className="bg-neutral-800 rounded-lg p-8">
          <h2 className="text-2xl">All Posts</h2>
          <div className="mt-2 grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
            {postData &&
              postData.postsCollection.edges.map(
                (post: { node: PostCollection }) => (
                  <PostComponent post={post.node} />
                )
              )}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Profile;
