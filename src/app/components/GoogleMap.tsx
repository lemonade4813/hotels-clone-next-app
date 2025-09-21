'use client'

import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

export default function GoogleMap() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      libraries: ["places"],
    });

    loader.load().then((google) => {
      const center = { lat: 37.5665, lng: 126.9780 }; // 서울 중심 좌표

      const map = new google.maps.Map(ref.current!, {
        center,
        zoom: 16,
      });


      new google.maps.Marker({
        position: center,
        map,
        title: "현재 위치", 
      });
    });
  }, []);
  return <div ref={ref} style={{ width: '100%', borderRadius : '30px', aspectRatio : '16/9'}} />
}