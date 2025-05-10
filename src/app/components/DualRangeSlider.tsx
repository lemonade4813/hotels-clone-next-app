'use client';

import React, { useState } from 'react';
import styles from './DualRangeSlider.module.css';

interface DualRangeSliderProps {
  min: number;
  max: number;
  step?: number;
}

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({ min, max, step = 1000 }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const range = max - min;

  const getPercent = (value: number) => Math.round(((value - min) / range) * 100);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(value);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <div className={styles.sliderTrack} />
        <div
          className={styles.sliderRange}
          style={{
            left: `${getPercent(minVal)}%`,
            width: `${getPercent(maxVal) - getPercent(minVal)}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className={`${styles.thumb} ${styles.thumbLeft}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className={`${styles.thumb} ${styles.thumbRight}`}
        />
      </div>
      <div className={styles.sliderValuesWrapper}>
        <div>
            <p>최소</p>
            <p>{minVal}</p>
        </div>
        <div>
            <p>최대</p>
            <p>{maxVal}</p> 
        </div>
      </div>
    </div>
  );
};

export default DualRangeSlider;