"use client"

import React, { useEffect, useRef, useState } from 'react'
import styles from "@/app/components/SearchOptionSelector.module.css";
import Image from 'next/image';
import calendar from "@/app/assets/calendar.svg";
import DateSelect from './DateSelect';

export default function SearchOptionSelector() {

    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClose = () => setOpen(false);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
            handleClose();
        }
      };
    
      document.addEventListener('click', handleClickOutside, { capture: false });
    
      return () => {
        document.removeEventListener('click', handleClickOutside, { capture: false });
      };
    }, [handleClose]);

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

    return (
        <div
            ref={wrapperRef}
            onClick={() => setOpen(prev => !prev)}
            className={styles.searchOptionSelectorContainer}
        >
            <Image src={calendar} alt="달력 이미지" />
            {selectedRange.start && selectedRange.end ? (
             <div style={{paddingLeft : '12px'}}>
                <p> 언제 떠나세요?</p>
                <p>{formatDate(selectedRange.start)} 
                - {formatDate(selectedRange.end)}
                </p>
             </div>   
            ) : (
                <p style={{paddingLeft : '12px'}}>언제 떠나세요?</p>
            )}

        {open && (
            <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                <DateSelect
                    onSelectDate={(start, end) => {
                    setTimeout(() => setSelectedRange({ start, end }), 0);
                }}
                />
                <button
                    className={styles.closeDateSelectButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                    }}
                >
                닫기
                </button>
            </div>
            )}
        </div>
    );
}