import DualRangeSlider from '@/app/components/DualRangeSlider'
import React from 'react'

export default function FilteringByPrice() {
  return (
    <div>
        <p>가격</p>
        <DualRangeSlider min={10000} max={100000}/>
    </div>
  )
}
