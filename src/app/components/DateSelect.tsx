import React, { useState, useRef, useEffect } from 'react';
import Calendar from '../Calendar';
import styles from './DateSelect.module.css';
import DecadeSelect from './DecadeSelect';

interface DateSelectProps {
  onClose: () => void;
}

export default function DateSelect({ onClose }: DateSelectProps) {
  const [tab, setTab] = useState<'calendar' | 'adjust' | null>('calendar');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
  
    document.addEventListener('click', handleClickOutside, { capture: false });
  
    return () => {
      document.removeEventListener('click', handleClickOutside, { capture: false });
    };
  }, [onClose]);
  return (
    <div
      ref={wrapperRef}
      className={styles.container}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
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
      {tab === 'calendar' ? <Calendar /> : <DecadeSelect/>}
    </div>
  );
}