import { useEffect, useState } from "react";
import { getUser } from "../utils/getUser";
import { SupabaseClient } from "../clients/Supabase.client";
import { UserProfile } from "../types";

const useUser = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    async function getUserFromSession() {
      const u = await getUser();
      if (u) {
        const { data } = await SupabaseClient.from("profiles")
          .select("*")
          .eq("id", u.id);
        setUser(data![0]);
      }
    }
    getUserFromSession();
  }, []);

  return user;
};

export default useUser;
