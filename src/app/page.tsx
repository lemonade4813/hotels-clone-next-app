import Image from "next/image";
import styles from "@/app/Home.module.css";
import position from "@/app/assets/position.svg";
import calendar from "@/app/assets/calendar.svg";
import person from "@/app/assets/person.svg";
import banner from "@/app/assets/banner.webp";
import CarouselContainer from "./components/carousel-container";
import RoomTypeCard from "./components/room-type-card";
import NoticeDiscount from "./components/notice-discount";
import SuggestionMenu from "./components/suggestion-memu";

export default function Home() {
  const roomtypes = 
                [{src : '/resort.jpg', name : '리조트'}, 
                 {src : '/waterpark.jpg', name : '워터파크'},
                 {src : '/oceanview.jpg', name : '바다전망'},
                 {src : '/spa.jpg', name : '스파'},
                 {src : '/pool.jpg', name : '수영장'},
                 {src : '/pool.jpg', name : '수영장'},
                ]
  return (
    <>
      <main className={styles.main}>
        <div style={{ position: 'relative', width: '1200px', height : '400px'}}>
          <Image
            src={banner}
            alt="배너"
            width={1200}
            style={{ borderRadius: '16px'}}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              boxSizing : 'border-box'
            }}
          >
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>다음엔 어디로 떠나세요?</p>
            <div
              style={{
                width: '1000px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#FFF',
                  padding: '1rem',
                  borderRadius: '8px',
                  flex : 1,
                }}
              >
                <Image src={position} alt="위치 이미지" />
                <div style={{ marginLeft: '0.5rem' }}>
                  <p>어디로 가세요?</p>
                  <p>인천, 한국</p>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#FFF',
                  padding: '1rem',
                  borderRadius: '8px',
                  flex : 1,
                }}
              >
                <Image src={calendar} alt="달력 이미지" />
                <div style={{ marginLeft: '0.5rem' }}>
                  <p>언제 떠나세요?</p>
                  <p>4월 30일 - 5월 2일</p>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#FFF',
                  padding: '1rem',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  flex : 1,
                }}
              >
                <Image src={person} alt="인원 수 이미지" />
                <div style={{ marginLeft: '0.5rem' }}>
                  <p>인원 수</p>
                  <p>객실 1개 2명</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NoticeDiscount/>
        <SuggestionMenu/>
        <div style={{ width: '1200px' , overflow : 'hidden'}}>
          <p>마음에 꼭 맞는 새로운 숙소 찾기</p>
        </div>        
        <CarouselContainer>
          {roomtypes.map(((rt, index) => 
            <RoomTypeCard 
              key={index} 
              src={rt.src} 
              name={rt.name}
            />)
          )}
        </CarouselContainer>
      </main>
    </>
  );
}
