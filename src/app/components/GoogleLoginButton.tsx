'use client'

import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react'
import googleSvg from '@/app/assets/common/google.svg';
import Image from 'next/image';
import styles from './GoogleLoginButton.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GoogleLoginButton() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/";

    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        await fetch("/api/auth/google-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        });
          router.push(redirect);
      },
        onError: (error) => {
          console.error('로그인에 실패하였습니다.:', error);
        },
        flow: 'implicit',
      });

    return (
        <button onClick={() => login()} className={styles.googleLoginButton}>
            <Image src={googleSvg} alt="구글 로고" className={styles.googleLogo}/>
            <p className={styles.googleLoginText}>Google 계정으로 로그인</p>
        </button>
  )
}
