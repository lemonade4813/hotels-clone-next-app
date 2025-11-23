import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { connectToDb } from "@/app/lib/utils";

// User schema
const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  picture: String,
  provider: String,
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(req: Request) {
  try {
    await connectToDb();

    const { accessToken } = await req.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: "구글 액세스 토큰이 없습니다." },
        { status: 400 }
      );
    }

    // 1) Google User Info API 호출 — 서버에서 실행됨!!!
    const googleRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const googleUser = await googleRes.json();

    const { email, name, picture } = googleUser;

    if (!email) {
      return NextResponse.json(
        { error: "Google 사용자 정보 가져오기 실패" },
        { status: 400 }
      );
    }

    // 2) DB에서 사용자 확인
    let user = await User.findOne({ email });

    // 없으면 새로 생성
    if (!user) {
      user = await User.create({
        email,
        name,
        picture,
        provider: "google",
      });
    }

    // 3) JWT 생성
    const jwtToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    // 4) HttpOnly Cookie 저장
    const res = NextResponse.json({
      message: "로그인 성공",
      user,
    });

    res.cookies.set("accessToken", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "서버 오류" },
      { status: 500 }
    );
  }
}