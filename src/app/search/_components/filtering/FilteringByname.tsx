import React, { memo, useEffect, useRef, useState } from 'react'
import { ICriteria } from '../../SearchResult';
import styles from "../../Search.module.scss";
import FilteringByNameModal from './FilteringByNameModal';

interface FilteringByNameProps {
    handleCriteria: <K extends keyof ICriteria>(key: K, value: ICriteria[K]) => void;
    value : string;
}


function FilteringByName({ value } : FilteringByNameProps) {
// function FilteringByName({ handleCriteria, value } : FilteringByNameProps) {
  
  const [isOpen, setIsOpen] = useState(false);

  const filteringModalRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleOutsideClose = (e: MouseEvent) => {
      if (isOpen && filteringModalRef.current && !filteringModalRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClose)
    return () => document.removeEventListener('click', handleOutsideClose)
  }, [isOpen])

  return (
    <div ref={filteringModalRef} style={{ borderTop : '1px solid #DFE0E4', marginTop : '20px'}}>
      <p className={styles.searchByNameText}>숙박 시설 이름으로 검색</p>
      <p
          className={styles.searchField} 
          onClick={() => setIsOpen(!isOpen)}
      >예 : 메리어트</p>
      {isOpen && <FilteringByNameModal />}
    </div>
  )
}

export default memo(FilteringByName);