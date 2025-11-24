import Image from "next/image";
import styles from "@/app/Home.module.scss";
import position from "@/app/assets/position.svg";
import person from "@/app/assets/person.svg";
import banner from "@/app/assets/banner.webp";
import CarouselContainer from "./components/CarouselContainer";
import RoomTypeCard from "./components/RoomTypeCard";
import NoticeDiscount from "./components/NoticeDiscount";
import SuggestionMenu from "./components/SuggestionMemu";
import Link from "next/link";
import SearchOptionSelector from "./components/SearchOptionSelector";

export default function Home() {
  const roomtypes = 
                [{src : '/resort.jpg', name : '리조트', keyword : 'resort'}, 
                 {src : '/waterpark.jpg', name : '워터파크', keyword : 'waterpark'},
                 {src : '/oceanview.jpg', name : '바다전망', keyword : 'oceanview'},
                 {src : '/spa.jpg', name : '스파', keyword : 'spa'},
                 {src : '/pool.jpg', name : '수영장', keyword : 'pool'},
                 {src : '/pool.jpg', name : '수영장', keyword : 'pool'},
                ]
  return (
    <>
      <main className={styles.main}>
        <div className={styles.bannerContainer}>
          <Image
            className={styles.bannerImage}
            src={banner}
            alt="배너"
            width={1200}
            style={{ borderRadius: '16px'}}
          />
          <div className={styles.bannerContentWrapper}>
            <p className={styles.bannerText}>다음엔 어디로 떠나세요?</p>
            <div className={styles.bannerCriteriaListContainer}>
              <div className={styles.bannerCriteriaItemContainer}>
                <Image src={position} alt="위치 이미지" />
                <div className={styles.criteriaField}>
                  <p>어디로 가세요?</p>
                  <p>인천, 한국</p>
                </div>
              </div>
              <SearchOptionSelector/>
              <div className={styles.bannerCriteriaItemContainer}>
                <Image src={person} alt="인원 수 이미지" />
                <div className={styles.criteriaField}>
                  <p>인원 수</p>
                  <p>객실 1개 2명</p>
                </div>
              </div>
              <button className={styles.searchButton}>검색</button>
            </div>
          </div>
        </div>
        <NoticeDiscount 
          noticeText="회원은 로그인시 전 세계 10만여개 호텔을 10% 이상 할인해 드려요. " 
          buttonText="지금 로그인하기"
          noticeType="discount"
          />  
        <SuggestionMenu/>
        <p style={{ fontSize : '24px', marginTop : '20px', marginBottom : '20px', flexFlow : 'left'}}>마음에 꼭 맞는 새로운 숙소 찾기</p>
        <CarouselContainer>
          {roomtypes.map(((rt, index) => 
          <Link href = {{pathname : `/search/${rt.keyword}`}} key={index}>
            <RoomTypeCard 
              key={index} 
              src={rt.src} 
              name={rt.name}
            />
            </Link>
          )
          )}
        </CarouselContainer>
      </main>
    </>
  );
}
