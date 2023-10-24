import { SupabaseClient } from "../clients/Supabase.client";
import { Post } from "../types";

const useLoadImage = (post: Post) => {
  if (!post || !post.media_path) return null;
  //  get image url for the posts
  const { data: imageData } = SupabaseClient.storage
    .from("post_media")
    .getPublicUrl(post.media_path);

  return imageData.publicUrl;
};

export default useLoadImage;
