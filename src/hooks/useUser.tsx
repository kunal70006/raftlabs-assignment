import { useEffect, useState } from "react";
import { getUser } from "../utils/getUser";
import { UserProfile } from "../types";

const useUser = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    async function getUserFromSession() {
      const u = await getUser();
      setUser(u);
    }
    getUserFromSession();
  }, []);

  return user;
};

export default useUser;
