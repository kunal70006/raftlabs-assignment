import { User } from "@supabase/supabase-js";
import { SupabaseClient } from "../clients/Supabase.client";
import { UserProfile } from "../types";

export async function getUser() {
  const {
    data: { user },
  } = await SupabaseClient.auth.getUser();

  return await getUserFromSupabase(user!)

}

export async function getUserFromSupabase(u: User): Promise<UserProfile> {
  const { data } = await SupabaseClient.from("profiles")
    .select("*")
    .eq("id", u.id);
  return data![0]
}