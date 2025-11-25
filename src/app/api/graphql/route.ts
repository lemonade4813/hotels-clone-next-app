import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { resolvers } from '@/app/lib/resolvers';
import { typeDefs } from '@/app/lib/typeDefs';
import jwt from "jsonwebtoken";
import { NextRequest } from 'next/server';

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    introspection : true
  });

// const handler = startServerAndCreateNextHandler(server);

const handler = startServerAndCreateNextHandler(server, {
  context: async (req : NextRequest) => {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) return { user: null };

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      return { user: decoded }; 
    } catch (err) {
      return { user: null };
    }
  },
});

export { handler as GET, handler as POST };