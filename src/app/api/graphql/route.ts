import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { resolvers } from '@/app/lib/resolvers';
import { typeDefs } from '@/app/lib/typeDefs';

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    introspection : true
  });

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };