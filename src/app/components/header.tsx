import React from 'react'
import styles from "@/app/Home.module.scss";
import Image from 'next/image';
import logo from "@/app/assets/logo.svg";
import download from "@/app/assets/download.svg";
import LoginModal from './LoginModal';
import Link from 'next/link';
import CommcenterImg from './common/CommcenterImage';

export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>
            <Link href="/"><Image src={logo} alt="호텔스 닷컴 로고 이미지"/></Link>
          </h1>
          <p>여행 예약</p>
          <ul className={styles.reservationDetail}>
            <li>렌터카</li>
            <li>특가 상품</li>
            <li>Hotels.com™ 호텔스닷컴 리워드</li>
          </ul>
        </div>
        <div className={styles.header}>
          <button className={styles.download}>
            <Image src={download} alt="앱 다운로드 이미지"/>
            앱 다운 받기
          </button>
          <nav>
            <ul className={styles.navMenu}>
              <li>KRW</li>
              <li>숙박시설 등록</li>
              <li>지원</li>
              <li>내 여행</li>
              <li >
                <CommcenterImg size={20}/>
              </li>
              <Link href={'/qna'}><li>Q&A</li></Link>
              <LoginModal/>
            </ul>
          </nav>
        </div>
      </header>
  )
}