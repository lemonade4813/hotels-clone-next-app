"use client"

import React, { useState } from 'react'
import styles from "@/app/Home.module.scss";
import ArrowImage2 from './common/ArrowImage2';

export default function ReservationMenu() {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className={styles.reservationWithIcon} onClick={()=> setIsOpen(prev => !prev)}>
            <p>여행 예약</p>
            <ArrowImage2 rotateDeg={0}/>
            {isOpen && <ul className={styles.reservationMenuList}>
                <li>렌터카</li>
                <li>특가 상품</li>
                <li>Hotels.com™ 호텔스닷컴 리워드</li>
            </ul>
            }
        </div>
    )
}
