import airconditioner from "@/app/assets/filtering/amenities/bar.svg"
import bar from "@/app/assets/filtering/amenities/bar.svg";
import bus from "@/app/assets/filtering/amenities/bus.svg";
import casino from "@/app/assets/filtering/amenities/casino.svg";
import crib from "@/app/assets/filtering/amenities/crib.svg";
import fitness from "@/app/assets/filtering/amenities/fitness.svg";
import golf from "@/app/assets/filtering/amenities/golf.svg";
import kitchen from "@/app/assets/filtering/amenities/kitchen.svg";
import oceanview from "@/app/assets/filtering/amenities/oceanview.svg";
import outdoor from "@/app/assets/filtering/amenities/outdoor.svg";
import parking from "@/app/assets/filtering/amenities/parking.svg";
import pool from "@/app/assets/filtering/amenities/pool.svg";
import restaurant from "@/app/assets/filtering/amenities/restaurant.svg";
import spa from "@/app/assets/filtering/amenities/spa.svg";
import tub from "@/app/assets/filtering/amenities/tub.svg";
import washingmachine from "@/app/assets/filtering/amenities/washingmachine.svg";
import waterpark from "@/app/assets/filtering/amenities/waterpark.svg";
import wifi from "@/app/assets/filtering/amenities/wifi.svg";
import pet from "@/app/assets/filtering/amenities/pet.svg";
import electcar from "@/app/assets/filtering/amenities/electcar.svg";

import Image from "next/image";
import styles from "./FilteringByAmenities.module.css";

const amenitesOption = [
    {name : 'bar', src : bar, discription : '바'},
    {name : 'bus', src : bus, discription : '버스'},
    {name : 'casino', src : casino, discription : '카지노'},
    {name : 'crib', src : crib, discription : '유아용 침대'},
    {name : 'fitness', src : fitness, discription : '피트니스 센터'},
    {name : 'golf', src : golf, discription : '골프'},
    {name : 'kitchen', src : kitchen, discription : '주방'},
    {name : 'oceanview', src : oceanview, discription : '바다 전망'},
    {name : 'outdoor', src : outdoor, discription : '야외 공간'},
    {name : 'parking', src : parking, discription : '주차'},
    {name : 'pool', src : pool, discription : '수영장'},
    {name : 'restaurant', src : restaurant, discription : '레스토랑'},
    {name : 'spa', src : spa, discription : '스파'},
    {name : 'airconditioner', src : airconditioner, discription : '에어컨'},
    {name : 'tub', src : tub, discription : '온수 욕조'},
    {name : 'washingmachine', src : washingmachine, discription : '세탁기 및 건조기'},
    {name : 'waterpark', src : waterpark, discription : '워터파크'},
    {name : 'wifi', src : wifi, discription : '와이파이'},
    {name : 'pet', src : pet, discription : '반려동물 동반 가능'},
    {name : 'electcar', src : electcar, discription : '전기차 충전소'},
]


export default function FilteringByAmenities() {
  return (
    <div>
      <p>편의시설/서비스</p>
      <div className={styles.amenitiesOptionContainer}>
          {amenitesOption.map((option) => 
            <div key={option.name} className={styles.amenitiesOptionItem}>
                <Image src={option.src} alt={option.discription}/>
                <span>{option.discription}</span>
            </div>
          )}
      </div>
    </div>
  )
}
