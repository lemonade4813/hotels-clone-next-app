import mongoose from "mongoose";

const connection = {} as any;

export const connectToDb = async () => {
    try {
      if (connection.isConnected) {
        console.log('이미 연결되었습니다.');
        return;
      }
      const db = await mongoose.connect(process.env.DB_URI!);
      connection.isConnected = db.connections[0].readyState;
    } catch (e) {
      console.log(e);
      throw new Error('오류 발생');
    }
}