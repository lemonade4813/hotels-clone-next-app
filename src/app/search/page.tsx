import Image from "next/image";
import styles from "./Search.module.css";
import searchSvg from  "@/app/assets/search.svg";
import positionSvg from "@/app/assets/position.svg";
import calendarSvg from "@/app/assets/calendar.svg";
import personSvg from "@/app/assets/person.svg";


export default function Search() {
  return (
        <div className={styles.container}>
            <div className={styles.searchOptionContainer}>
                <div className={styles.searchOption}>
                    <div className={styles.searchOptionItem}>
                        <Image src={positionSvg} alt="" width={24}/>
                        <div style={{flex : 1}}>
                            <p>어디로 가세요?</p>
                            <p>한국</p>
                        </div>
                    </div>
                    <div className={styles.searchOptionItem}>
                        <Image src={calendarSvg} alt=""/>
                        <div style={{flex : 1}}>
                            <p>날짜</p>
                            <p>5월 9일 - 5월 11일</p>
                        </div>
                    </div>
                    <div className={styles.searchOptionItem}>
                        <Image src={personSvg} alt=""/>
                        <div style={{flex : 1}}>
                            <p>인원 수</p>
                            <p>객실 1개 2명</p>
                        </div>
                    </div>
                </div>
                <button className={styles.searchButton}>
                    <Image src={searchSvg} alt="검색 버튼 이미지" width={24} height={24}/>
                </button>
            </div>
            <div className={styles.content}>
                <div className={styles.asideContainer}>
                </div>
                <div className={styles.mainContainer}>
                </div>
            </div>
        </div>

  )
}
