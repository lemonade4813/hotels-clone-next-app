import Image from 'next/image';
import React, { useMemo } from 'react'
import CalendarSvg from '@/app/assets/calendar.svg';
import styles from  './DecadeSelect.module.css';

export default function DecadeSelect() {

    const monthList = useMemo(() => {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        const list = [];
      
        for (let i = 0; i < 6; i++) {
          let newYear = year;
          let newMonth = month + i;
      
          if (newMonth > 12) {
            newYear += Math.floor((newMonth - 1) / 12);
            newMonth = ((newMonth - 1) % 12) + 1;
          }
      
          list.push({ year: newYear, month: newMonth });
        }
      
        return list;
      },[]);
      

  return (
    <div className={styles.container}>
        <div className={styles.monthSelectWrapper}>
            <p>원하시는 숙박 기간을 선택해 주세요.</p>
            <div>
                <button className={styles.periodSelectButton}>1박</button>
                <button className={styles.periodSelectButton}>2~3박</button>
                <button className={styles.periodSelectButton}>4~5박</button> 
                <button className={styles.periodSelectButton}>6~7박</button>
            </div>
            <div>
                <input type='checkbox' id='includeWeekend'/>
                <label htmlFor='includeWeekend'>주말을 포함해야 함</label>
            </div>
        </div>
        <div className={styles.monthSelectWrapper}>
            <p>원하시는 숙박 기간을 선택해 주세요.</p>
            <p>월을 여러 개 선택하실 수 있습니다.</p>
            <div style={{display : 'flex', justifyContent : 'space-between'}}>
                {monthList.map(({month, year}) => 
                    <button className={styles.monthSelectButtob}>
                        <Image src={CalendarSvg} alt="캘린더"/>
                        <p>{month} 월</p>
                        <p>{year}</p>
                    </button>
                )}
            </div>
        </div>
    </div>
  )
}
