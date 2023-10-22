import { SupabaseClient } from "../clients/Supabase.client";

export async function getUser() {
  const {
    data: { user },
  } = await SupabaseClient.auth.getUser();
  return user;
}
