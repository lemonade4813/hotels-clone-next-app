import Image from 'next/image'
import React from 'react'
import mod from '@/app/assets/mod.svg'
import styles from './NoticeDiscount2.module.scss'

interface NoticeDiscount2Props {
  noticeText: string
  buttonText: string
  /** flex 레이아웃 내부 배치 시 true로 설정 (width: auto, flex: 1) */
  isFlexible?: boolean
}

export default function NoticeDiscount2({
  noticeText,
  buttonText,
  isFlexible = false,
}: NoticeDiscount2Props) {
  // isFlexible 조건에 따라 class를 조합합니다.
  const containerClassName = `${styles.container} ${isFlexible ? styles.isFlexible : ''}`

  return (
    <div className={containerClassName}>
      <Image src={mod} alt="" height={48} />
      <p className={styles.text}>{noticeText}</p>
      <div>
        <button className={styles.button}>{buttonText}</button>
        <button className={styles.rewardDetailButton}>자세히 알아보기</button>
      </div>
    </div>
  )
}