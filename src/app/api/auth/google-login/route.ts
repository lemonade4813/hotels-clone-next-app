import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDb } from "@/app/lib/utils";
import clientPromise from "@/app/lib/mongo";

export async function POST(req: Request) {
  try {
    const { access_token } = await req.json();
    if (!access_token) return NextResponse.json({ error: "토큰이 없습니다. " }, { status: 400 });

    // 1. 구글 사용자 정보 가져오기
    const googleRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const googleUser = await googleRes.json();

    if (!googleUser.email) {
      return NextResponse.json({ error: "Google 유저 정보가 없습니다. " }, { status: 400 });
    }

    // 2. DB 연결
    await connectToDb();
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    // 3. 기존 유저 확인
    let user = await users.findOne({ email: googleUser.email });

    // 4. 신규 유저 생성
    if (!user) {
      const newUser = {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        createdAt: new Date(),
      };
      const result = await users.insertOne(newUser);
      user = { _id: result.insertedId, ...newUser };
    }

    // 5. JWT 생성
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET가 존재하지 않습니다.");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6. HttpOnly Secure Cookie 저장
    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "accessToken",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다. " }, { status: 500 });
  }
}