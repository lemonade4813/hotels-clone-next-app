import { useMemo } from 'react';
import styles from './Calendar.module.css';

export default function Calendar() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate(); // 현재 날짜

  const lastDay = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const dayList = ['일', '월', '화', '수', '목', '금', '토'];

  const dayOfMonth = useMemo(() => {
    const list: number[][] = [];
    let currentWeek: number[] = [];
    let weekOfDay: number = firstDayOfWeek;

    // 첫 주 공백
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(0);
    }

    for (let i = 1; i <= lastDay; i++) {
      currentWeek.push(i);
      weekOfDay = (weekOfDay + 1) % 7;
      if (weekOfDay === 0) {
        list.push(currentWeek);
        currentWeek = [];
      }
    }

    // 마지막 주 공백 채우기
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(0);
      }
      list.push(currentWeek);
    }

    return list;
  }, [year, month, lastDay, firstDayOfWeek]);

  return (
    <div className={styles.container}>
      {/* 요일 헤더 */}
      <div className={styles.week}>
        {dayList.map((day, i) => (
          <div
            key={day}
            className={`${styles.dayItem} ${styles.dayHeader} ${
              i === 0 ? styles.sunday : ''
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      {dayOfMonth.map((week, weekIndex) => (
        <div key={weekIndex} className={styles.week}>
          {week.map((day, dayIndex) => {
            const isSunday = dayIndex === 0;
            const isToday = day === today;

            return (
              <div
                key={dayIndex}
                className={`${styles.dayItem} ${isSunday ? styles.sunday : ''}`}
              >
                {day !== 0 && (
                  <div className={isToday ? styles.today : ''}>{day}</div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}