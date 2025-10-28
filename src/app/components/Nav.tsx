import Image from 'next/image'
import React from 'react'
import styles from './nav.module.css';

export default function Nav() {
  return (
    <nav style={{  backgroundColor : '#F8F3E7', paddingLeft : '400px', paddingRight: '400px', boxSizing : 'border-box'}}>
        <Image src='https://a.travel-assets.com/globalcontrols-service/content/f285fb631b0a976202ef57611c7050e9ef5ca51a/images/EG_Wordmark_blue_RGB.svg'
               alt='그룹 이미지'
               width={150}
               height={22}
               style={{ marginTop : '20px'}}
        />
        <div className={styles.navWrapper}>
            <section>
                <h2 className={styles.title}>지원 및 자주 묻는 질문</h2>
                <ul className={styles.menu}>
                    <li>일본의 호텔</li>
                    <li>싱가포르 호텔</li>
                    <li>이탈리아의 호텔</li>
                    <li>미국의 호텔</li>
                    <li>한국의 호텔</li>
                    <li>대만 베스트 호텔</li>
                    <li>아르헨티나 베스트 호텔</li>
                    <li>베트남의 호텔</li>
                    <li>인도네시아 베스트 호텔</li>
                </ul>
            </section>
            <section>
                <h2 className={styles.title}>지원 및 자주 묻는 질문</h2>
                <ul className={styles.menu}>
                    <li>내 예약</li>
                    <li>자주 묻는 질문(FAQ)</li>
                    <li>연락처</li>
                    <li>숙박 시설 이용 후기 작성</li>
                </ul>
            </section>
            <section>
                <h2 className={styles.title}>공급업체, 제휴사 및 미디어</h2>
                <ul className={styles.menu}>
                    <li>내 예약</li>
                    <li>자주 묻는 질문(FAQ)</li>
                    <li>연락처</li>
                    <li>숙박 시설 이용 후기 작성</li>
                </ul>
            </section>
            <section>
                <h2 className={styles.title}>정책</h2>
                <ul className={styles.menu}>
                    <li>이용약관</li>
                    <li>개인정보 보호</li>
                    <li>쿠키</li>
                    <li>콘텐츠 지침 및 신고</li>
                </ul>
            </section>
            <section>
                <h2 className={styles.title}>기타 정보</h2>
                <ul className={styles.menu}>
                    <li>회사 소개</li>
                    <li>채용</li>
                    <li>여행 가이드</li>
                </ul>
            </section>
        </div>
    </nav>
  )
}
