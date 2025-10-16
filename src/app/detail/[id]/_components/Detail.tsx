'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import Image from 'next/image';
import React from 'react'
import StarSvg from '@/app/assets/common/star.svg';
import style from '../Detail.module.css';
import GoogleMap from '@/app/components/GoogleMap';
import PoolSvg from '@/app/assets/filtering/amenities/pool.svg';
import RestaurantSvg from '@/app/assets/filtering/amenities/restaurant.svg';
import VipAccessItem from '@/app/components/common/VipAccessItem';
import ArrowImage from '@/app/components/common/ArrowImage';

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


    return (
        <div className={style.container}>
            <div className={style.header}>
                <ul className={style.nav}>
                    <li>소개</li>
                    <li>편의 시설/서비스</li>
                    <li>객실</li>
                    <li>장애인 지원</li>
                    <li>정책</li>
                </ul>
                <button className={style.roomSelectButton}>객실 선택</button>
            </div>
            <div style={{display : 'flex', gap : '40px'}}>
                <div style={{width : '40vw'}}>
                <div className={style.overViewWrapper}>
                    <div className={style.hotelGradeWrapper}>
                        <p className={style.luxuryItem}>럭셔리</p>
                        <VipAccessItem/>
                        <div className={style.ratingPoint}>
                            <Image src={StarSvg} alt="rate" width={16} height={16}/>
                            <Image src={StarSvg} alt="rate" width={16} height={16}/>
                            <Image src={StarSvg} alt="rate" width={16} height={16}/>
                            <Image src={StarSvg} alt="rate" width={16} height={16}/>
                        </div>
                    </div>
                    <p className={style.hotelKorName}>파르나스 호텔 제주</p>
                    <p className={style.hotelEngName}>parnas Hotel Jeju</p>
                    {/* <div className={style.ratingWrapper}>
                        <p className={style.rating}>9.4</p>
                        <p>최고에요</p>
                        <div>
                            <p className={style.review}>이용 후기 1,004개</p>
                        </div>
                    </div> */}
                    <p className={style.hotelSummary}>해변 파라디이스에서 즐기는 멋진 일몰</p>
                    <p className={style.hotelDescription}>뛰어난 전망과 조경이 잘 관리된 놀랍도록 아름다운 숙소로, 해변 애호가와 멋진 일출과 일몰을 찾는 분들에게 완벽한 곳입니다. 인상적인 인피니티 풀, 환상적인 뷔페, 클럽 라운지에서 기억에 남는 해피아워를 즐겨보세요.</p>
                </div>
                <div style={{width : '100%'}}>
                    <p style={{fontSize : '20px'}}>이 숙박 시설에 대한 정보</p>
                    <p>이 거리 근처에 위치한 럭셔리 호텔, 14개의 레스토랑 보유</p>
                    <div style={{display : 'flex', gap : '10px'}}>
                        <p style={{display : 'flex', alignItems : 'center', flex : 1}}><Image src={PoolSvg} alt="야외 수영장"/>야외 수영장</p>
                        <p style={{display : 'flex', alignItems : 'center', flex : 1}}><Image src={RestaurantSvg} alt="레스토랑"/>뷔페 레스토랑</p>
                    </div>
                    <p style={{color : '#1668E3', display : 'flex', alignItems : 'center', gap : '10px'}}>이 숙박 시설에 대한 전체 내용 확인하기<ArrowImage size={20}/></p>    
                </div>
                </div>   
                <div style={{display : 'flex', flexDirection : 'column'}}>
                    <div className={style.ratingWrapper}>
                        <p className={style.rating}>9.4</p>
                        <p>최고에요</p>
                        <div>
                            <p className={style.review}>이용 후기 1,004개</p>
                        </div>
                    </div>
                    <div style={{width : '30vw', height : '20vh'}}>
                        <GoogleMap/>
                    </div>
                </div>
            </div>
            <div className={style.vipAccessPrivilegeInfoContainer}>    
                <VipAccessItem/>
                <div className={style.vipAccessPrivilegeContentWrapper}>
                    <p>회원님께 드리는 더 많은 혜택</p>
                    <ul className={style.listStyle}>
                        <li>실버 이상 등급이 되면 일부 VIP Access 숙박 시설 15% 이상 할인</li>
                        <li>최고 수준의 품질과 탁월한 서비스 제공</li>
                        <li>일부 숙박 시설에서의 숙박 특전 및 객실 이용 상황에 따라 
                            무료 객실 업그레이드, 이른 체크인 및 늦은 체크아웃 제공
                        </li>
                    </ul>
                    <p className={style.detailPrvilegeInfoText}>
                        자세히 알아보기
                        <ArrowImage size={20}/>
                    </p>
                 
                </div>
            </div>
        </div>
      
    )
}
