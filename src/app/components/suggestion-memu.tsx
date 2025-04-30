import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'
import arrow from "@/app/assets/arrow.svg";
import styles from "./SuggestionMenu.module.css";

export default function SuggestionMenu({src, title, name} : {src : StaticImageData, title : string, name : string}) {
  return (
    <div className={styles.container}>
      <div className={styles.suggestionMenuLeft}>
          <p>{title}</p>
          <div style={{display : 'flex', alignItems : 'center'}}>
            <Link href="">{name}</Link>
            <Image src={arrow} alt=""/>
          </div>
      </div>
      <Image src={src} alt="" className={styles.image}/>
     </div>
  )
}
