import Image from 'next/image'
import React from 'react'
import CheckSvg from '@/app/assets/common/check.svg';
import styles from './OverviewItem.module.css';

export default function OverviewItem({ svgImg } : { svgImg? : any }) {
  return (
    <div className={styles.overviewItemWrapper}>
    <Image 
      src={svgImg ? svgImg : CheckSvg} 
      alt="체크 아이콘" 
      style={{ display: 'block', marginTop: 20 }}
    />
    <div>
      <p style={{ fontSize: '20px' }}>숙박 시설 규모</p>
      <div>
        <p>281개 아파트</p>
        <p>총 27층 규모</p>
      </div>
    </div>
  </div>
  )
}
