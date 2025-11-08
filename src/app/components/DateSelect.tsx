import React, { useState, useRef, useEffect } from 'react';
import Calendar from '../Calendar';
import styles from './DateSelect.module.css';

interface DateSelectProps {
  onClose: () => void;
}

export default function DateSelect({ onClose }: DateSelectProps) {
  const [tab, setTab] = useState<'calendar' | 'adjust' | null>('calendar');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={wrapperRef} className={styles.container}>
      <div className={styles.tabButtonWrapper}>
        <button className={styles.tabButton} onClick={() => setTab('calendar')}>
          달력
        </button>
        <button className={styles.tabButton} onClick={() => setTab('adjust')}>
          날짜 조정 가능
        </button>
      </div>
      {tab === 'calendar' ? <Calendar /> : <div>날짜 조정 가능</div>}
    </div>
  );
}