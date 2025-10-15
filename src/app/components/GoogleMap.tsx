'use client'

import { PropsWithChildren, useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import style from '@/app/components/GoogleMap.module.scss';


interface IGoogleMap {
  mapWidth? : number;
  lat? : number;
  lng? : number;


}
// const center = { lat: 37.5665, lng: 126.9780 }

export default function GoogleMapCopy(
  { mapWidth, 
    lat = 37.5665, 
    lng = 126.9780, 
    children 
  } : PropsWithChildren<IGoogleMap>) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      libraries: ["places"],
    });

    loader.load().then((google) => {
      const center = { lat, lng };

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
  return (
      <div className={style.container} style={{width : mapWidth ? `${mapWidth}px` : '100%'}}>
        <div ref={ref} className={style.mapArea}/>
        <div className={style.bottomArea}>
          {children}
        </div>
      </div>
  )
}