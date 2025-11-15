"use client"

import React, { useState } from 'react'
import styles from "@/app/Home.module.scss";
import Image from 'next/image';
import calendar from "@/app/assets/calendar.svg";
import DateSelect from './DateSelect';

export default function SearchOptionSelector() {

    const [open, setOpen] = useState(false);

    return (
        <div    
            className={styles.bannerCriteriaItemContainer} 
            style={{ position: 'relative' }}>
            <div onClick={() => setOpen(prev => !prev)}>
                <Image src={calendar} alt="달력 이미지" />
                <div className={styles.criteriaField}>
                    <p>언제 떠나세요?</p>
                    <p>4월 30일 - 5월 2일</p>
                </div>
            </div>
            {open && (
                <div style={{ position: 'absolute' }}>
                    <DateSelect onClose={() => setOpen(false)} />
                </div>
            )}
        </div>
    
    )
}



