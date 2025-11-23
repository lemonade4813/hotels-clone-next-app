'use client'

import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react'
import googleSvg from '@/app/assets/common/google.svg';
import Image from 'next/image';
import styles from './GoogleLoginButton.module.scss';

export default function GoogleLoginButton() {

    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
          const res = await fetch("/api/auth/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken: tokenResponse.access_token
            })
          });
      
          const data = await res.json();
          console.log("로그인 결과:", data);
        } catch (e) {
          console.error(e);
        }
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
