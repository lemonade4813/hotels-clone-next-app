import Image from 'next/image'
import React from 'react'
import mod from "@/app/assets/mod.svg";
import styles from './NoticeDiscount.module.scss';

export default function NoticeDiscount({noticeText, buttonText, noticeType} : {noticeText : string, buttonText : string, noticeType : 'Reward' | 'Discount' }) {
  return (
    <div className={noticeType === 'Discount' ? styles.discountContainer : styles.rewardContainer}>
        <Image src={mod} alt="" height={48}/>      
        <p className={styles.text}>{noticeText}</p>      
        <button className={styles.button}>{buttonText}</button>
    </div>
  )
}
