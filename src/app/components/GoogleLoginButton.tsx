'use client'

import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react'
import googleSvg from '@/app/assets/common/google.svg';
import Image from 'next/image';
import styles from './GoogleLoginButton.module.css';

export default function GoogleLoginButton() {

    const [user, setUser] = useState<string | null>(null);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
        //   apollo server와 연동 예정    
        //   try {
        //     const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        //       headers: {
        //         Authorization: `Bearer ${tokenResponse.access_token}`,
        //       },
        //     });
        //     setUser(res.json());
        //     console.log('User Info:', res.json());
        //   } catch (err) {
        //     console.error('Failed to fetch user info', err);
        //   }
        },
        onError: (error) => {
          console.error('로그인에 실패하였습니다.:', error);
        },
        flow: 'implicit',
      });



  return (
        //     커스텀 버튼 구현       
        //     <GoogleLogin
        //         onSuccess={credentialResponse => {
        //         console.log(credentialResponse);
        //         }}
        //         onError={() => {
        //         console.log('Login Failed');
        //         }}
        //      />
        <button onClick={() => login()} className={styles.googleLoginButton}>
            <Image src={googleSvg} alt="구글 로고" className={styles.googleLogo}/>
            <p className={styles.googleLoginText}>Google 계정으로 로그인</p>
        </button>
  )
}
