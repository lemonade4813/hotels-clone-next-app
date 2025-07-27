import React from 'react'
import GoogleLoginButton from '../components/GoogleLoginButton'
import fulllogoSvg from '@/app/assets/common/fulllogo.svg'
import backSvg from '@/app/assets/back.svg'
import Image from 'next/image'
import styles from './Login.module.css'


export default function Login() {
  return (
    <div style={{position : 'relative'}}>
    <Image src={backSvg} alt='뒤로 가기' width={30} height={30} style={{}}/>
    <div className={styles.container}>  
        <Image src={fulllogoSvg} alt='로고' width={200} height={40}/>
        <p className={styles.loginText}>로그인 또는 회원가입</p>
        <p>익스피디아, 호텔스닷컴 및 Vrbo에서 하나의 계정을 사용해 여행을 즐겨보새요.</p>
        <GoogleLoginButton/>
        <p style={{ textAlign : 'center', marginTop : '40px'}}>또는</p>
        <input 
          placeholder='이메일' 
          type='id' 
          className={styles.emailInput}
        />
        <button className={styles.continueButton}>계속하기</button>
    </div>
    </div>
  )
}
