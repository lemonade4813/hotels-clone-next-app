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

interface CalendarProps {
  onSelectDate: (start: Date, end: Date) => void;
}

export default function Calendar({ onSelectDate }: CalendarProps) {

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

      // 첫 클릭 → 시작일로 저장
      if (prev.length === 0) return [clicked];
  
      // 두 번째 클릭 → 시작·종료 결정
      if (prev.length === 1) {
        if (prev[0].getTime() === clicked.getTime()) return prev; // 같은 날짜 클릭 시 유지
        const a = prev[0];
        const b = clicked;
        const start = a.getTime() <= b.getTime() ? a : b;
        const end = a.getTime() <= b.getTime() ? b : a;
  
        // 부모에게 날짜 전달
        onSelectDate(start, end);
  
        return [start, end];
      }
  
      // 시작/끝 모두 선택된 상태에서 다시 클릭한 경우
      const times = prev.map((d) => d.getTime());
      const start = new Date(Math.min(...times));
      const end = new Date(Math.max(...times));
      const ct = clicked.getTime();
  
      // 범위 앞 확장: 기존 start 전에 클릭
      if (ct < start.getTime()) {
        const newRange = [clicked, end];
        onSelectDate(newRange[0], newRange[1]);
        return newRange;
      }
  
      // 범위 뒤 확장: 기존 end 이후 클릭
      if (ct > end.getTime()) {
        const newRange = [start, clicked];
        onSelectDate(newRange[0], newRange[1]);
        return newRange;
      }
  
      // 범위 내부 클릭 → 더 가까운 쪽으로 조정
      const distToStart = Math.abs(ct - start.getTime());
      const distToEnd = Math.abs(end.getTime() - ct);
  
      const newStart = distToStart <= distToEnd ? clicked : start;
      const newEnd = distToEnd < distToStart ? clicked : end;
  
      const sorted = [
        new Date(Math.min(newStart.getTime(), newEnd.getTime())),
        new Date(Math.max(newStart.getTime(), newEnd.getTime())),
      ];
  
      onSelectDate(sorted[0], sorted[1]);
      return sorted;
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