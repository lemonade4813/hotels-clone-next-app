import React, { useState } from 'react';
import Calendar from '../Calendar';
import styles from './DateSelect.module.css';
import DecadeSelect from './DecadeSelect';

interface DateSelectProps {
  onSelectDate: (start: Date, end: Date) => void;
}


export default function DateSelect({ onSelectDate }: DateSelectProps) {

  const [tab, setTab] = useState<'calendar' | 'adjust' | null>('calendar');

  return (
    <div className={styles.container}>
      <div className={styles.tabButtonWrapper}>
        <button 
          className={styles.tabButton} 
          onClick={() => setTab('calendar')}
          style={{borderTopLeftRadius : '20px'}}
        >
          달력
        </button>
        <button 
          className={styles.tabButton} 
          onClick={() => setTab('adjust')}
          style={{borderTopRightRadius : '20px'}}
          >
          날짜 조정 가능
        </button>
      </div>
      {tab === 'calendar'

    ? <>
      <Calendar onSelectDate={onSelectDate} /> :
      <div className={styles.dateRangeAddWrapper}>
          <button className={styles.dateRangeAddButton}>정확한 날짜</button>
          <button className={styles.dateRangeAddButton}>±1일</button>
          <button className={styles.dateRangeAddButton}>±2일</button>
          <button className={styles.dateRangeAddButton}>±3일</button>
          <button className={styles.dateRangeAddButton}>±7일</button>
      </div>
      </>
    : <DecadeSelect />
  }
    </div>
  );
}