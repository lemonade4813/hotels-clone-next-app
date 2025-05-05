import clientPromise from "./mongo";

export const resolvers = {
    Query: {
      result : async (_: any, args: { keyword?: string }) => {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection('resort');
  
        const filter = args.keyword ? { keyword : args.keyword } : {};
        const results = await collection.find(filter).toArray();
  
        return results;
      },
    },
  };