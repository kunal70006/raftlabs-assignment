import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { SupabaseClient } from "../clients/Supabase.client";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Auth
        supabaseClient={SupabaseClient}
        appearance={{ theme: ThemeSupa, style: { input: { color: "white" } } }}
        providers={["github"]}
      />
    </div>
  );
};

export default Login;
