import React, { memo } from 'react'
import { ICriteria } from '../../SearchResult';
import styles from "../../Search.module.css";

interface FilteringByNameProps {
    handleCriteria: <K extends keyof ICriteria>(key: K, value: ICriteria[K]) => void;
}


function FilteringByName({ handleCriteria } : FilteringByNameProps) {
  return (
    <div>
        <p>숙박 시설 이름으로 검색</p>
        <input 
            placeholder="예 : 메리어트" 
            className={styles.searchField} 
            onChange={(e)=> handleCriteria('name', e.target.value)}
        />
    </div>
  )
}

export default memo(FilteringByName);