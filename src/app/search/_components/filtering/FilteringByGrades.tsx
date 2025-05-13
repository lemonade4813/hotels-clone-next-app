import Image from 'next/image'
import React, { memo } from 'react'
import styles from "../../Search.module.css";
import starSvg from "@/app/assets/star.svg";
import { ICriteria } from '../../SearchResult';

const grades: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];

interface FilteringByGradesProps {
    handleCriteria: <K extends keyof ICriteria>(key: K, value: ICriteria[K]) => void;
}


function FilteringByGrades({ handleCriteria } : FilteringByGradesProps) {
  return (
    <div>
        <span>숙박 시설 등급</span>
        <div className={styles.gradeContainer}>
            {grades.map((grade) => 
            <div 
                className={styles.gradeItem} 
                onClick={()=> handleCriteria('grade', grade)}
            >
                <span>{grade}</span>
                <Image
                    src={starSvg} 
                    width={30} 
                    height={30} 
                    alt="호텔 등급 스타"
                />
            </div> 
        )}
        </div>
    </div>
  )
}

export default memo(FilteringByGrades);
