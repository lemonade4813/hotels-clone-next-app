"use client";

import { useMemo } from "react";
import styles from "./Calendar.module.css";

interface Props {
  year: number;
  month: number;
  today: number;
  clickedDates: Date[];
  onDayClick: (date: Date) => void;
}

const dayList = ["일", "월", "화", "수", "목", "금", "토"];

export default function MonthCalendar({ year, month, today, clickedDates, onDayClick }: Props) {
  const lastDay = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

  const dayOfMonth = useMemo(() => {
    const list: number[][] = [];
    let currentWeek: number[] = [];

    for (let i = 0; i < firstDayOfWeek; i++) currentWeek.push(0);

    for (let i = 1; i <= lastDay; i++) {
      currentWeek.push(i);
      if (currentWeek.length % 7 === 0) {
        list.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(0);
      list.push(currentWeek);
    }

    return list;
  }, [year, month, lastDay, firstDayOfWeek]);

  const rangeStart =
    clickedDates.length > 0
      ? new Date(Math.min(...clickedDates.map((d) => d.getTime())))
      : null;

  const rangeEnd =
    clickedDates.length > 0
      ? new Date(Math.max(...clickedDates.map((d) => d.getTime())))
      : null;

  const dateForCell = (d: number) => new Date(year, month - 1, d);

  const isInRange = (d: number) => {
    if (d === 0 || !rangeStart || !rangeEnd) return false;
    const current = dateForCell(d);
    return (
      current.getTime() >= rangeStart.getTime() &&
      current.getTime() <= rangeEnd.getTime()
    );
  };

  const isStart = (d: number) =>
    rangeStart && d !== 0 && dateForCell(d).getTime() === rangeStart.getTime();

  const isEnd = (d: number) =>
    rangeEnd && d !== 0 && dateForCell(d).getTime() === rangeEnd.getTime();

  return (
    <div>
      {/* 요일 헤더 */}
      <div className={styles.week}>
        {dayList.map((day, i) => (
          <div
            key={day}
            className={`${styles.dayItem} ${styles.dayHeader} ${
              i === 0 ? styles.sunday : ""
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
            const isToday = year === new Date().getFullYear() &&
                            month === new Date().getMonth() + 1 &&
                            day === today;

            const inRange = isInRange(day);
            const start = isStart(day);
            const end = isEnd(day);

            return (
              <div
                key={dayIndex}
                onClick={() => day !== 0 && onDayClick(dateForCell(day))}
                className={`${styles.dayItem} 
                  ${isSunday ? styles.sunday : ''}
                  ${inRange ? styles.range : ''} 
                  ${start ? styles.rangeStart : ''} 
                  ${end ? styles.rangeEnd : ''}`}
              >
                {day !== 0 ? (
                  start || end ? (
                    <div className={styles.selected}>{day}</div>
                  ) : isToday ? (
                    <div className={styles.today}>{day}</div>
                  ) : (
                    <div>{day}</div>
                  )
                ) : (
                  <div />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}