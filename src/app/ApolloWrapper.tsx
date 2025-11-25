"use client";

import { HttpLink, from, ApolloLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { onError } from "@apollo/client/link/error";

function makeClient() {
  // 1) 에러 링크: UNAUTHORIZED 발생 시 로그인 페이지로 이동
  const errorLink = onError(({ graphQLErrors }) => {
    if (!graphQLErrors) return;

    for (const err of graphQLErrors) {
      if (err.message === "UNAUTHORIZED") {
        const current = window.location.pathname + window.location.search;
        window.location.href = `/login?redirect=${encodeURIComponent(current)}`;
      }
    }
  });

  // 2) HttpLink
  const httpLink = new HttpLink({
    uri: "/api/graphql",
    credentials: "include",
  });

  // 3) 링크들을 합치기
  const link = from([errorLink, httpLink]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}