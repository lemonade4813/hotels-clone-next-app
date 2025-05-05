import Image from 'next/image'
import React from 'react'

export default function RoomTypeCard({src, name } : {src : string, name : string}  ) {
  return (
    <div
        style={{
            flex: '0 0 20%',
            minWidth: '180px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px',
            borderRadius: '8px',
            boxSizing: 'border-box',
            position: 'relative', // fill을 위해 필수
            overflow: 'hidden',   // 이미지 넘침 방지
            aspectRatio : '4/5',
       
        }}
    >
        <Image
          src={src}
          alt={`${name} 이미지`}
          fill
          style={{
            objectFit: 'cover',
            borderRadius: '12px',
          }}
        />
        <span style={{ position: 'absolute', bottom: '10px', left: '10px' }}>{name}</span>
    </div>
  )
}
