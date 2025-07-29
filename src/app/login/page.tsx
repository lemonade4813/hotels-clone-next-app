'use client'

import React from 'react'
import GoogleLoginButton from '../components/GoogleLoginButton'
import fulllogoSvg from '@/app/assets/common/fulllogo.svg'
import backSvg from '@/app/assets/back.svg'
import Image from 'next/image'
import styles from './Login.module.css'
import appleSvg from '@/app/assets/common/apple.svg'
import facebookSvg from '@/app/assets/common/facebook.svg'
import NaverLoginButton from '../components/NaverLoginButton'
import { useRouter } from 'next/navigation'

export default function Login() {

  const router = useRouter();

  return (
    <div className={styles.pageContainer}>
    <Image src={backSvg} alt='뒤로 가기' width={30} height={30} onClick={()=>router.back()}/>
    <div className={styles.loginContainer}>  
        <Image src={fulllogoSvg} alt='로고' width={200} height={40}/>
        <p className={styles.loginText}>로그인 또는 회원가입</p>
        <p>익스피디아, 호텔스닷컴 및 Vrbo에서 하나의 계정을 사용해 여행을 즐겨보새요.</p>
        <GoogleLoginButton/>
        <p className={styles.text}>또는</p>
        <input 
          placeholder='이메일' 
          type='id' 
          className={styles.emailInput}
        />
        <button className={styles.continueButton}>계속하기</button>
        <p className={styles.text}>다른 로그인 옵션</p>
        <div className={styles.socialContainer}>
          <NaverLoginButton/>
          <Image src={appleSvg} alt='애플'/>
          <Image src={facebookSvg} alt='페이스북'/>
        </div>
    </div>
    </div>
  )
}
