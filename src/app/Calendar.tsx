"use client";

import { useReducer, useState } from "react";
import styles from "./Calendar.module.css";
import ArrowImage2 from "./components/common/ArrowImage2";
import Month from "./Month";

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
                    {year}년 {month}월 ~{" "}
                    {month === 12 ? `${year + 1}년 1월` : `${year}년 ${month + 1}월`}
                </strong>
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
                <Month
                    year={year}
                    month={month}
                    today={today}
                    clickedDates={clickedDates}
                    onDayClick={handleDayClick}
                />
                <Month
                    year={month === 12 ? year + 1 : year}
                    month={month === 12 ? 1 : month + 1}
                    today={today}
                    clickedDates={clickedDates}
                    onDayClick={handleDayClick}
                />
            </div>
        </div>
    );
}
