import Image from 'next/image'
import React from 'react'
import styles from './Nav.module.css';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className={styles.container}>
        <Image src='https://a.travel-assets.com/globalcontrols-service/content/f285fb631b0a976202ef57611c7050e9ef5ca51a/images/EG_Wordmark_blue_RGB.svg'
               alt='그룹 이미지'
               width={150}
               height={22}
               style={{ marginTop : '20px'}}
        />
        <div className={styles.navWrapper}>
            <section>
                <h2 className={styles.title}>인기 도시</h2>
                <ul className={styles.menu}>
                    <li>
                        <Link href=''>일본의 호텔</Link>
                    </li>
                    <li>
                        <Link href=''>싱가포르 호텔</Link>
                    </li>
                    <li>
                        <Link href=''>이탈리아의 호텔</Link>
                    </li>
                    <li>
                        <Link href=''>미국의 호텔</Link>
                    </li>
                    <li>
                        <Link href=''>한국의 호텔</Link>
                    </li>
                    <li>
                        <Link href=''>대만 베스트 호텔</Link>
                    </li>
                    <li>
                        <Link href=''>아르헨티나 베스트 호텔</Link>
                    </li>
                    <li>
                        <Link href=''>베트남의 호텔</Link>
                    </li>
                    <li>
                        <Link href=''>인도네시아 베스트 호텔</Link>
                    </li>
                </ul>
            </section>
            <section>
                <h2 className={styles.title}>지원 및 자주 묻는 질문</h2>
                <ul className={styles.menu}>
                    <li>
                        <Link href=''>내 예약</Link>
                    </li>
                    <li>
                        <Link href=''>자주 묻는 질문(FAQ)</Link>
                    </li>
                    <li>
                        <Link href=''>연락처</Link>
                    </li>
                    <li>
                        <Link href=''>숙박 시설 이용 후기 작성</Link>
                    </li>
                </ul>
            </section>
            <section>
                <h2 className={styles.title}>공급업체, 제휴사 및 미디어</h2>
                <ul className={styles.menu}>
                    <li>
                        <Link href=''>내 예약</Link>
                    </li>
                    <li>
                        <Link href=''>자주 묻는 질문(FAQ)</Link>
                    </li>
                    <li>
                        <Link href=''>연락처</Link>
                    </li>
                    <li>
                        <Link href=''>숙박 시설 이용 후기 작성</Link>
                    </li>
                </ul>
            </section>
            <section>
                <h2 className={styles.title}>정책</h2>
                <ul className={styles.menu}>
                    <li>
                        <Link href=''>이용약관</Link>
                    </li>
                    <li>
                        <Link href=''>개인정보 보호</Link>
                    </li>
                    <li>
                        <Link href=''>쿠키</Link>
                    </li>
                    <li>
                        <Link href=''>콘텐츠 지침 및 신고</Link>
                    </li>
                </ul>
            </section>
            <section>
                <h2 className={styles.title}>기타 정보</h2>
                <ul className={styles.menu}>
                    <li>
                        <Link href=''>회사 소개</Link>
                    </li>
                    <li>
                        <Link href=''>채용</Link>
                    </li>
                    <li>
                        <Link href=''>여행 가이드</Link>
                     </li>
                </ul>
            </section>
        </div>
    </nav>
  )
}
