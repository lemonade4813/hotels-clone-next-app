import Image from 'next/image'
import React from 'react'
import mod from "@/app/assets/mod.svg";

export default function NoticeDiscount() {
  return (
    <div style={{borderRadius : '16px', backgroundColor : '#0c0e1c', height : '80px', width : '1200px', marginTop : '30px', display : 'flex', alignItems : 'center', justifyContent : 'space-between', padding : '16px', gap : '20px'}}>
        <Image src={mod} alt="" height={48}/>      
        <p style={{color : '#fff', flex : 1}}>회원은 로그인시 전 세계 10만여개 호텔을 10% 이상 할인해 드려요.</p>      
        <button style={{width : '100px'}}>지금 로그인하기</button>
    </div>
  )
}
