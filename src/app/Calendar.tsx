// "use client"

// import { useMemo, useReducer, useState } from 'react';
// import styles from './Calendar.module.css';
// import ArrowImage2 from './components/common/ArrowImage2';

// interface SelectedDate {
//     year: number;
//     month: number;
//     today: number;
//   }
  
// export default function Calendar() {


//   type Action =
//     | { type: 'PREV_MONTH' }
//     | { type: 'NEXT_MONTH' };

//   const reducer = (selectedDate : SelectedDate , action : Action) => {
//     const { year, month } = selectedDate;
  
//     switch (action.type) {
//       case 'PREV_MONTH':
//         if (month === 1) {
//           return { ...selectedDate, year: year - 1, month: 12 };
//         }
//         return { ...selectedDate, month: month - 1 };
  
//       case 'NEXT_MONTH':
//         if (month === 12) {
//           return { ...selectedDate, year: year + 1, month: 1 };
//         }
//         return { ...selectedDate, month: month + 1 };
  
//       default:
//         return selectedDate;
//     }
//   };

//   const now = new Date();

//   const nowYear = now.getFullYear();
//   const nowMonth = now.getMonth() + 1;
//   const nowDate = now.getDate();

//   const initialState = {
//     year: nowYear,
//     month: nowMonth,
//     today: nowDate
//   };

//   const [{year, month, today}, dispatch] = useReducer(reducer, initialState);

//   const lastDay = new Date(year, month, 0).getDate();
//   const firstDayOfWeek = new Date(year, month -1 , 1).getDay();

//   const dayList = ['일', '월', '화', '수', '목', '금', '토'];



//   const dayOfMonth = useMemo(() => {
//     const list: number[][] = [];
//     let currentWeek: number[] = [];
//     let weekOfDay: number = firstDayOfWeek;

//     // 첫 주 공백
//     for (let i = 0; i < firstDayOfWeek; i++) {
//       currentWeek.push(0);
//     }

//     for (let i = 1; i <= lastDay; i++) {
//       currentWeek.push(i);
//       weekOfDay = (weekOfDay + 1) % 7;
//       if (weekOfDay === 0) {
//         list.push(currentWeek);
//         currentWeek = [];
//       }
//     }

//     // 마지막 주 공백 채우기
//     if (currentWeek.length > 0) {
//       while (currentWeek.length < 7) {
//         currentWeek.push(0);
//       }
//       list.push(currentWeek);
//     }

//     return list;
//   }, [year, month, lastDay, firstDayOfWeek]);

//   return (
//     <div className={styles.container}>
//         <div className={styles.calendarHeader}>
//             <button 
//                 className={styles.changeMonthButton} 
//                 onClick={()=> dispatch({type : 'PREV_MONTH'})}
//             >
//                 <ArrowImage2 rotateDeg={90}/>
//             </button>
//             <p>
//                 <strong>
//                     {year}년 {month}월
//                 </strong>
//             </p>
//             <button className={styles.changeMonthButton}
//              onClick={()=> dispatch({type : 'NEXT_MONTH'})}
//             >
//                 <ArrowImage2 rotateDeg={-90}/>
//             </button>
//         </div>
//         {/* 요일 헤더 */}
//         <div className={styles.week}>
//             {dayList.map((day, i) => (
//             <div
//                 key={day}
//                 className={`${styles.dayItem} ${styles.dayHeader} ${
//                 i === 0 ? styles.sunday : ''
//                 }`}
//             >
//                 {day}
//             </div>
//             ))}
//         </div>

//         {/* 날짜 */}
//         {dayOfMonth.map((week, weekIndex) => (
//             <div key={weekIndex} className={styles.week}>
//             {week.map((day, dayIndex) => {
//                 const isSunday = dayIndex === 0;
    

//                 return (
//                 <div
//                     key={dayIndex}
//                     className={`${styles.dayItem} ${isSunday ? styles.sunday : ''}`}
//                 >
//                     {day !== 0 && (
//                     <div className={isToday ? styles.today : ''}>{day}</div>
//                     )}
//                 </div>
//                 );
//             })}
//             </div>
//         ))}
//         </div>
//     );
// }

"use client"

import { useMemo, useReducer } from 'react';
import styles from './Calendar.module.css';
import ArrowImage2 from './components/common/ArrowImage2';

interface SelectedDate {
  year: number;
  month: number;
  today: number;
}

export default function Calendar() {

  type Action =
    | { type: 'PREV_MONTH' }
    | { type: 'NEXT_MONTH' };

  const reducer = (selectedDate: SelectedDate, action: Action) => {
    const { year, month } = selectedDate;

    switch (action.type) {
      case 'PREV_MONTH':
        if (month === 1) {
          return { ...selectedDate, year: year - 1, month: 12 };
        }
        return { ...selectedDate, month: month - 1 };

      case 'NEXT_MONTH':
        if (month === 12) {
          return { ...selectedDate, year: year + 1, month: 1 };
        }
        return { ...selectedDate, month: month + 1 };

      default:
        return selectedDate;
    }
  };

  const now = new Date();

  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();

  const initialState = {
    year: nowYear,
    month: nowMonth,
    today: nowDate,
  };

  const [{ year, month, today }, dispatch] = useReducer(reducer, initialState);

  const lastDay = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

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
      <div className={styles.calendarHeader}>
        <button
          className={styles.changeMonthButton}
          onClick={() => dispatch({ type: 'PREV_MONTH' })}
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
          onClick={() => dispatch({ type: 'NEXT_MONTH' })}
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

 
            const isToday =
              year === nowYear && month === nowMonth && day === today;

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