import React, { memo } from 'react'
import { ICriteria } from '../../SearchResult';
import styles from "../../Search.module.css";

interface FilteringByNameProps {
    handleCriteria: <K extends keyof ICriteria>(key: K, value: ICriteria[K]) => void;
    value : string;
}


function FilteringByName({ handleCriteria, value } : FilteringByNameProps) {
  
  console.log('재렌더링 11111')

  return (
    <div>
        <p>숙박 시설 이름으로 검색</p>
        <input 
            value={value}
            placeholder="예 : 메리어트" 
            className={styles.searchField} 
            onChange={(e)=> handleCriteria('name', e.target.value)}
        />
    </div>
  )
}

export default memo(FilteringByName);