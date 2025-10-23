'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import StarSvg from '@/app/assets/common/star.svg';
import styles from '../Detail.module.css';
import GoogleMap from '@/app/components/GoogleMap';
import PoolSvg from '@/app/assets/filtering/amenities/pool.svg';
import PreviousSvg from '@/app/assets/common/previous.svg';
import RestaurantSvg from '@/app/assets/filtering/amenities/restaurant.svg';
import VipAccessItem from '@/app/components/common/VipAccessItem';
import ArrowImage from '@/app/components/common/ArrowImage';
import Save from '@/app/components/common/Save';
import Share from '@/app/components/common/Share';
import ParkingSvg from '@/app/assets/common/parking.svg';
import AreaSvg from '@/app/assets/common/area.svg';
import BedSvg from '@/app/assets/common/bed.svg';
import PersonSvg from '@/app/assets/common/person.svg';
import CheckSvg from '@/app/assets/common/check.svg';
import WifiSvg from '@/app/assets/common/wifi.svg';

export default function Detail({ id } : { id : string }) {

    const GET_DETAIL_INFO = gql`
        query GetDetailInfo($id: String) {
            detail(id: $id) {
                _id
                name
                city
                imgUrl
                location
                rating
                isFullRefund
                costPrice
                salePrice
                totalPrice
                grade
                keyword
            }
        }
    `

    const { data } = useSuspenseQuery<{ detail: [] }>(
        GET_DETAIL_INFO, 
        { variables  : { id }, 
        errorPolicy : 'all'}
    );

    
    const sectionRefs = useRef<HTMLDivElement[]>([]);

    const hotelName = 'parnas';
    const hotelMainImage = ['image1'];
    const hotelImageList = ['image2', 'image3', 'image4', 'image5'];

    const [sectionIndex, setSectionIndex] = useState(0);


    useEffect(() => {
        sectionRefs.current[sectionIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, [sectionIndex]);
    
      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
                if (index !== -1) setSectionIndex(index);
              }
            });
          },
          {
            root: null,
            threshold: 0.8,
          }
        );
    
        sectionRefs.current.forEach((section) => {
          if (section) observer.observe(section);
        });
    
        return () => observer.disconnect();
      }, []);

    return (
        <div className={styles.container}>
             <div className={styles.hotelImageWrapper}>
                <div className={styles.hotelMainImageWrapper}>
                    <Image 
                        src={PreviousSvg} alt='이전 페이지 이동' 
                        className={styles.previousButton}
                    />
                    <Image
                        src={`/hotel/preview/${hotelName}/${hotelMainImage}.jpg`}
                        alt="호텔이미지 1"
                        width={800}
                        height={420}
                        className={styles.hotelMainImage}
                    />
                </div>
                <div className={styles.hotelSubImageWrapper}>
                    <div className={styles.favoriteAndSaveButtonWrapper}>
                        <Save/>
                        <Share/>
                    </div>
                    {hotelImageList.map((img, index) => (
                    <div key={index} className={styles.hotelSubImageItemWrapper}>
                        <Image
                            src={`/hotel/preview/${hotelName}/${img}.jpg`}
                            alt={`호텔이미지 ${img}`}
                            width={400}
                            height={200}
                            className={styles.hotelSubImageItem}
                        />
                    </div>
                    ))}
                </div>
            </div>
            <div className={styles.header}>
                <ul className={styles.nav}>
                    <li onClick={()=> setSectionIndex(0)} className={ sectionIndex === 0 ? styles.active : ''}>소개</li>
                    <li onClick={()=> setSectionIndex(1)} className={ sectionIndex === 1 ? styles.active : ''}>편의 시설/서비스</li>
                    <li onClick={()=> setSectionIndex(2)} className={ sectionIndex === 2 ? styles.active : ''}>객실</li>
                    <li onClick={()=> setSectionIndex(3)} className={ sectionIndex === 3 ? styles.active : ''}>장애인 지원</li>
                    <li onClick={()=> setSectionIndex(4)} className={ sectionIndex === 4 ? styles.active : ''}>정책</li>
                </ul>
                <button className={styles.roomSelectButton}>객실 선택</button>
            </div>
            <div ref={(el) => {
                if(el)
                sectionRefs.current[0] = el;
            }}>
                <div className={styles.introWrapper}>
                    <div className={styles.introLeftWrapper}>
                        <div className={styles.overViewWrapper}>
                            <div className={styles.hotelGradeWrapper}>
                                <p className={styles.luxuryItem}>럭셔리</p>
                                <VipAccessItem/>
                                <div className={styles.ratingPoint}>
                                    <Image src={StarSvg} alt="rate" width={16} height={16}/>
                                    <Image src={StarSvg} alt="rate" width={16} height={16}/>
                                    <Image src={StarSvg} alt="rate" width={16} height={16}/>
                                    <Image src={StarSvg} alt="rate" width={16} height={16}/>
                                </div>
                            </div>
                            <p className={styles.hotelKorName}>파르나스 호텔 제주</p>
                            <p className={styles.hotelEngName}>parnas Hotel Jeju</p>
                            <p className={styles.hotelSummary}>해변 파라디이스에서 즐기는 멋진 일몰</p>
                            <p className={styles.hotelDescription}>뛰어난 전망과 조경이 잘 관리된 놀랍도록 아름다운 숙소로, 해변 애호가와 멋진 일출과 일몰을 찾는 분들에게 완벽한 곳입니다. 인상적인 인피니티 풀, 환상적인 뷔페, 클럽 라운지에서 기억에 남는 해피아워를 즐겨보세요.</p>
                        </div>
                        <div style={{ width : '100%' }}>
                            <p style={{ fontSize : '20px' }}>이 숙박 시설에 대한 정보</p>
                            <p>이 거리 근처에 위치한 럭셔리 호텔, 14개의 레스토랑 보유</p>
                            <div className={styles.amenitiesWrapper}>
                                <p className={styles.amenityText}><Image src={PoolSvg} alt="야외 수영장"/>야외 수영장</p>
                                <p className={styles.amenityText}><Image src={RestaurantSvg} alt="레스토랑"/>뷔페 레스토랑</p>
                            </div>
                            <p className={styles.goToAllInfoHotel}>이 숙박 시설에 대한 전체 내용 확인하기<ArrowImage size={20}/></p>    
                        </div>
                    </div>   
                    <div className={styles.ratingWrapper}>
                        <div className={styles.ratingHeader}>
                            <p className={styles.rating}>9.4</p>
                            <p>최고에요</p>
                            <div>
                                <p className={styles.review}>이용 후기 1,004개</p>
                            </div>
                        </div>
                        <div className={styles.googleMapWrapper}>
                            <GoogleMap/>
                        </div>
                    </div>
                </div>
                <div className={styles.vipAccessPrivilegeInfoContainer} >    
                    <VipAccessItem/>
                    <div className={styles.vipAccessPrivilegeContentWrapper}>
                        <p>회원님께 드리는 더 많은 혜택</p>
                        <ul className={styles.listStyle}>
                            <li>실버 이상 등급이 되면 일부 VIP Access 숙박 시설 15% 이상 할인</li>
                            <li>최고 수준의 품질과 탁월한 서비스 제공</li>
                            <li>일부 숙박 시설에서의 숙박 특전 및 객실 이용 상황에 따라 
                                무료 객실 업그레이드, 이른 체크인 및 늦은 체크아웃 제공
                            </li>
                        </ul>
                        <p className={styles.detailPrvilegeInfoText}>
                            자세히 알아보기
                            <ArrowImage size={20}/>
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.hotelRoomListWrapper}>
                <div className={styles.hotelRoomItemWrapper}>
                    <Image src={'/hotel/preview/parnas/room/deluxe/image1.jpg'} alt="이미지 1" width={300} height={100}/>
                    <div className={styles.hotelRoomInfoListWrapper}>
                        <div className={styles.hotelRoomInfoItemWrapper}>
                            <Image src={ParkingSvg} alt="무료 주차"/>무료 셀프 주차
                        </div>
                        <div className={styles.hotelRoomInfoItemWrapper}>
                            <Image src={AreaSvg} alt="면적"/>
                            <p>37㎡</p>
                        </div>
                        <div className={styles.hotelRoomInfoItemWrapper}>
                            <Image src={BedSvg} alt="침대"/>
                            <p>킹사이드침대 1개</p>
                        </div>
                        <div className={styles.hotelRoomInfoItemWrapper}>
                            <Image src={PersonSvg} alt="사람 수"/>
                            <p>3명</p>
                        </div>
                        <div className={styles.hotelRoomInfoItemWrapper}>
                            <Image src={WifiSvg} alt="와이파이"/>
                            <p>무료 Wifi</p>
                        </div>
                        <div className={styles.hotelRoomInfoItemWrapper}>
                            <Image src={CheckSvg} alt="현장 결제"/>
                            <p>37㎡</p>
                        </div>
                        <div className={styles.hotelRoomInfoItemWrapper}>
                            <Image src='https://a.travel-assets.com/egds/marks/brands/hotels/loyalty.svg' width={20} height={20} alt="면적"/>
                            <p>적립및 사용</p>
                        </div>
                    </div>
                </div>
                <div style={{ borderRadius : '20px', backgroundColor : '#d3d3d3', height : '300px'}}>
                </div>
                <div style={{ borderRadius : '20px', backgroundColor : '#c8c8c8', height : '300px'}}>
                </div>
            </div>
            {/* <div 
                style={{height : '800px', background : 'red'}} 
                ref={(el) => {
                    if(el)
                    sectionRefs.current[1] = el;
                }
            }>
            </div> */}
            <div style={{height : '800px', background : 'blue'}} 
                ref={(el) => {
                    if(el)
                    sectionRefs.current[2] = el;
                }
            }>
            </div>
            <div style={{height : '800px', background : 'green'}} 
                ref={(el) => {
                    if(el)
                    sectionRefs.current[3] = el;
                }
            }>
            </div>
            <div style={{height : '800px', background : 'hotpink'}} 
                ref={(el) => {
                    if(el)
                    sectionRefs.current[4] = el;
                }
            }>
            </div>
        </div>
    )
}
