import clientPromise from "./mongo";
import { ObjectId } from 'mongodb';

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
      detail : async (_: any, args: { id?: string }) => {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection('resort');
  
        const result = await collection.findOne({ _id: new ObjectId(args.id) });
     
        return result;
      },
      qnaList: async () => {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection('qnalist');
      
        const results = await collection.find({}).toArray();
      
        return results;
      }
    },
  };