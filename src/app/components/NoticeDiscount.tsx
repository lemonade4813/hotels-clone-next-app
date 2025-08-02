import Image from 'next/image'
import React from 'react'
import mod from "@/app/assets/mod.svg";
import styles from './NoticeDiscount.module.scss';

export default function NoticeDiscount({noticeText, buttonText, noticeType} : {noticeText : string, buttonText : string, noticeType : 'reward' | 'discount' }) {
  return (
    <div className={noticeType === 'reward' ? styles.rewardContainer : styles.discountContainer}>
        <Image src={mod} alt="" height={48}/>      
        <p className={styles.text}>{noticeText}</p>      
        <div>
          <button className={styles.button}>{buttonText}</button>
          {noticeType === 'reward' && <button className={styles.rewardDetailButton}>자세히 알아보기</button>}
        </div>
    </div>
  )
}
