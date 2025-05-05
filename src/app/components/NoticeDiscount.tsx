import Image from 'next/image'
import React from 'react'
import mod from "@/app/assets/mod.svg";
import styles from './NoticeDiscount.module.css';

export default function NoticeDiscount() {
  return (
    <div className={styles.container}>
        <Image src={mod} alt="" height={48}/>      
        <p className={styles.text}>회원은 로그인시 전 세계 10만여개 호텔을 10% 이상 할인해 드려요.</p>      
        <button className={styles.button}>지금 로그인하기</button>
    </div>
  )
}
