import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'
import arrow from "@/app/assets/arrow.svg";
import styles from "./SuggestionMenu.module.css";
import recommend1 from "@/app/assets/recommend2.jpg";
import recommend2 from "@/app/assets/recommend2.jpg";
import recommend3 from "@/app/assets/recommend3.jpg";


export default function SuggestionMenu() {

  const suggestionMenu = [
    {src : recommend1, title : '10박을 숙박하면 리워드 1박!', name : '숙소 검색'},
    {src : recommend2, title : '계획 변경에도 안심! 언제든지 취소할 수 있는 유연한 숙소를 예약하세요', name : '지금 예약'},
    {src : recommend3, title : '호텔을 나란히 비교에 나에게 맞는곳을 찾아보세요', name : '호텔 비교'}
  ]
  return (
    <div className={styles.menuContainer}>
      {suggestionMenu.map((menu) => <SuggestionMenuItem key={menu.name} {...menu}/>)}
    </div>
   
  )
}

const SuggestionMenuItem = ({src, title, name} : {src : StaticImageData, title : string, name : string}) => {

  return(
    <div className={styles.itemContainer}>
      <div className={styles.suggestionMenuLeft}>
          <p>{title}</p>
          <div style={{display : 'flex', alignItems : 'center'}}>
            <Link href="">{name}</Link>
            <Image src={arrow} alt=""/>
          </div>
      </div>
      <Image src={src} alt="" className={styles.image}/>
   </div>
  )



}