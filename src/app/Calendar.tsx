"use client";

import { useMemo, useReducer, useState } from "react";
import styles from "./Calendar.module.css";
import ArrowImage2 from "./components/common/ArrowImage2";

interface SelectedDate {
  year: number;
  month: number;
  today: number;
}

export default function Calendar() {
  type Action = { type: "PREV_MONTH" } | { type: "NEXT_MONTH" };

  const reducer = (selectedDate: SelectedDate, action: Action) => {
    const { year, month } = selectedDate;

    switch (action.type) {
      case "PREV_MONTH":
        if (month === 1) return { ...selectedDate, year: year - 1, month: 12 };
        return { ...selectedDate, month: month - 1 };
      case "NEXT_MONTH":
        if (month === 12) return { ...selectedDate, year: year + 1, month: 1 };
        return { ...selectedDate, month: month + 1 };
      default:
        return selectedDate;
    }
  };

  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();

  const initialState = { year: nowYear, month: nowMonth, today: nowDate };
  const [{ year, month, today }, dispatch] = useReducer(reducer, initialState);

  const lastDay = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const dayList = ["일", "월", "화", "수", "목", "금", "토"];

  const [clickedDates, setClickedDates] = useState<Date[]>([]);

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

//   const handleDayClick = (day: number) => {
//     if (day === 0) return;
//     const clicked = new Date(year, month - 1, day);
//     setClickedDates((prev) => {
//       if (prev.some((d) => d.getTime() === clicked.getTime())) return prev;
//       return [...prev, clicked];
//     });
//   };

const handleDayClick = (day: number) => {
    if (day === 0) return;
    const clicked = new Date(year, month - 1, day);
  
    setClickedDates((prev) => {
      // 0개: 시작점 추가
      if (prev.length === 0) return [clicked];
  
      // 1개: 두번째(종료) 추가 (중복 클릭 무시)
      if (prev.length === 1) {
        if (prev[0].getTime() === clicked.getTime()) return prev;
        const a = prev[0];
        const b = clicked;
        return a.getTime() <= b.getTime() ? [a, b] : [b, a];
      }
  
      // prev.length >= 2: 현재 start / end 계산
      const times = prev.map((d) => d.getTime());
      const start = new Date(Math.min(...times));
      const end = new Date(Math.max(...times));
      const ct = clicked.getTime();
  
      // 클릭이 범위 바깥 (왼쪽)
      if (ct < start.getTime()) {
        return ct <= end.getTime() ? [clicked, end] : [end, clicked]; // 보정(정렬)
      }
  
      // 클릭이 범위 바깥 (오른쪽)
      if (ct > end.getTime()) {
        return start.getTime() <= ct ? [start, clicked] : [clicked, start]; // 보정(정렬)
      }
  
      // 클릭이 범위 안쪽: 더 가까운 끝점을 교체
      const distToStart = Math.abs(ct - start.getTime());
      const distToEnd = Math.abs(end.getTime() - ct);
  
      if (distToStart <= distToEnd) {
        // 시작점을 클릭한 날짜로 교체
        const a = clicked;
        const b = end;
        return a.getTime() <= b.getTime() ? [a, b] : [b, a];
      } else {
        // 끝점을 클릭한 날짜로 교체
        const a = start;
        const b = clicked;
        return a.getTime() <= b.getTime() ? [a, b] : [b, a];
      }
    });
  };

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
    <div className={styles.container}>
      <div className={styles.calendarHeader}>
        <button
          className={styles.changeMonthButton}
          onClick={() => dispatch({ type: "PREV_MONTH" })}
        >
          <ArrowImage2 rotateDeg={90} />
        </button>
        <p>
          <strong>
            {year}년 {month}월
          </strong>
        </p>
        <button
          className={styles.changeMonthButton}
          onClick={() => dispatch({ type: "NEXT_MONTH" })}
        >
          <ArrowImage2 rotateDeg={-90} />
        </button>
      </div>

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
            const isToday =
              year === nowYear && month === nowMonth && day === today;

            const inRange = isInRange(day);
            const start = isStart(day);
            const end = isEnd(day);

            return (
              <div
                key={dayIndex}
                onClick={() => handleDayClick(day)}
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