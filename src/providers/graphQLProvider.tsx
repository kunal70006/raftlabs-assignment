import { SupabaseClient } from "../clients/Supabase.client";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export function GraphQLProvider(props: { children: React.ReactNode }) {
  function getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      apikey: import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
    };

    SupabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session?.access_token) {
        headers["authorization"] = `Bearer ${session?.access_token}`;
      }
    });
    return headers;
  }

  const [client] = React.useState(function createUrqlClient() {
    return new ApolloClient({
      uri: `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/graphql/v1`,
      cache: new InMemoryCache(),
      headers: getHeaders(),
      connectToDevTools: import.meta.env.DEV,
    });
  });
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
