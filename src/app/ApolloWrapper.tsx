"use client";

import { HttpLink, from } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { onError } from "@apollo/client/link/error";


const errorLink = onError(({ graphQLErrors }) => {
  
  console.log(1111)
  if (!graphQLErrors) return;

  console.log(1111)
  for (const err of graphQLErrors) {
    if (err.extensions?.code === "UNAUTHORIZED") {
      const currentPath = window.location.pathname + window.location.search;
      console.log(currentPath);
      console.log('인증 안됨')

      // 로그인 페이지로 이동 (redirect 포함)
      window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
      return;
    }
  }
});


function makeClient() {
  const httpLink = new HttpLink({
    uri: "/api/graphql",
    credentials : "include",
    fetchOptions: {
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}