"use client";

import { useReducer, useState } from "react";
import styles from "./Calendar.module.css";
import ArrowImage2 from "./components/common/ArrowImage2";
import MonthCalendar from "./Month";


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

  const [clickedDates, setClickedDates] = useState<Date[]>([]);

  const handleDayClick = (clicked: Date) => {
    setClickedDates((prev) => {
      if (prev.length === 0) return [clicked];
      if (prev.length === 1) {
        if (prev[0].getTime() === clicked.getTime()) return prev;
        const a = prev[0];
        const b = clicked;
        return a.getTime() <= b.getTime() ? [a, b] : [b, a];
      }
      const times = prev.map((d) => d.getTime());
      const start = new Date(Math.min(...times));
      const end = new Date(Math.max(...times));
      const ct = clicked.getTime();

      if (ct < start.getTime()) return [clicked, end];
      if (ct > end.getTime()) return [start, clicked];

      const distToStart = Math.abs(ct - start.getTime());
      const distToEnd = Math.abs(end.getTime() - ct);
      if (distToStart <= distToEnd) return [clicked, end];
      return [start, clicked];
    });
  };

  // 부모에서 rangeStart / rangeEnd 계산
  const rangeStart =
    clickedDates.length > 0
      ? new Date(Math.min(...clickedDates.map((d) => d.getTime())))
      : null;

  const rangeEnd =
    clickedDates.length > 0
      ? new Date(Math.max(...clickedDates.map((d) => d.getTime())))
      : null;

  // 한국어 요일 및 포맷 함수
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const formatKoreanDate = (d: Date) => {
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const weekday = weekdays[d.getDay()];
    return `${month}월 ${date}일 (${weekday})`;
  };

  // 화면에 표시할 문자열 생성
  const selectedRangeText = (() => {
    if (!rangeStart) return "선택된 날짜가 없습니다.";
    if (!rangeEnd) return formatKoreanDate(rangeStart); // 사실상 rangeEnd 항상 존재하지만 안전성 위해
    if (rangeStart.getTime() === rangeEnd.getTime()) return formatKoreanDate(rangeStart);
    return `${formatKoreanDate(rangeStart)} → ${formatKoreanDate(rangeEnd)}`;
  })();

  return (
    <div className={styles.container}>
        <div className={styles.calendarHeader}>
            <button
                className={styles.changeMonthButton}
                onClick={() => dispatch({ type: "PREV_MONTH" })}
            >
                <ArrowImage2 rotateDeg={90} />
            </button>
            {/* 선택 범위 표시 (부모에서) */}
            <p className={styles.rangeText}>
                {selectedRangeText}
            </p>
            <button
                className={styles.changeMonthButton}
                onClick={() => dispatch({ type: "NEXT_MONTH" })}
            >
                <ArrowImage2 rotateDeg={-90} />
            </button>
        </div>

     

      {/* 연속 2달 */}
      <div className={styles.calendarGroupWrapper}>
        <MonthCalendar
          year={year}
          month={month}
          today={today}
          clickedDates={clickedDates}
          onDayClick={handleDayClick}
        />
        <MonthCalendar
          year={month === 12 ? year + 1 : year}
          month={month === 12 ? 1 : month + 1}
          today={today}
          clickedDates={clickedDates}
          onDayClick={handleDayClick}
        />
      </div>
    </div>
  )};