// import mongoose from "mongoose";

// const connection = {} as any;

// export const connectToDb = async () => {
//     try {
//       if (connection.isConnected) {
//         console.log('이미 연결되었습니다.');
//         return;
//       }
//       const db = await mongoose.connect(process.env.DB_URI!);
//       connection.isConnected = db.connections[0].readyState;
//     } catch (e) {
//       console.log(e);
//       throw new Error('오류 발생');
//     }
// }

import mongoose from "mongoose";

export const connectToDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(" MONGODB_URI 환경변수가 없습니다.");
  }

  await mongoose.connect(uri);
  console.log("DB Connected");
};