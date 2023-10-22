import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { ComponentWithOnlyChildrenProp } from "../types";
import { SupabaseClient } from "../clients/Supabase.client";
import Login from "../components/Login";
import RootLayout from "../common/RootLayout";

const AuthProvider: React.FC<ComponentWithOnlyChildrenProp> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    SupabaseClient.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .catch((err) => console.error(err));
    const {
      data: { subscription },
    } = SupabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <RootLayout>
        <Login />
      </RootLayout>
    );
  }
  return <>{children}</>;
};

export default AuthProvider;
