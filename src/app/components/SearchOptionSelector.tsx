"use client"

import React, { useState } from 'react'
import styles from "@/app/Home.module.scss";
import Image from 'next/image';
import calendar from "@/app/assets/calendar.svg";
import DateSelect from './DateSelect';

export default function SearchOptionSelector() {
    const [open, setOpen] = useState(false);

    const [selectedRange, setSelectedRange] = useState<{
        start: Date | null;
        end: Date | null;
    }>({ start: null, end: null });

    const formatDate = (d: Date) => {
        const m = d.getMonth() + 1;
        const day = d.getDate();
        return `${m}월 ${day}일`;
    };

    const displayText =
        selectedRange.start && selectedRange.end
            ? `${formatDate(selectedRange.start)} - ${formatDate(selectedRange.end)}`
            : `언제 떠나세요?`;

    return (
        <div
            onClick={() => setOpen(prev => !prev)}
            className={styles.bannerCriteriaItemContainer}
        >
            <Image src={calendar} alt="달력 이미지" />
            {selectedRange.start && selectedRange.end ? (
             <div style={{paddingLeft : '12px'}}>
                <p>언제 떠나세요?</p>
                <p>{formatDate(selectedRange.start)} - {formatDate(selectedRange.end)}</p>
             </div>   
            ) : (
                <p>언제 떠나세요?</p>
            )}

            {open && (
                <div style={{ position: 'absolute' }}>
                    <DateSelect
                        onClose={() => setOpen(false)}
                        onSelectDate={(start, end) =>
                            setSelectedRange({ start, end })
                        }
                    />
                </div>
            )}
        </div>
    );
}