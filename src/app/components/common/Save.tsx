import Image from 'next/image'
import SaveSvg from '@/app/assets/common/save.svg';
import styles from './Save.module.css'

export default function Save() {
  return (
    <button className={styles.buttonLayout}>
        <Image src={SaveSvg} alt="save image"/>
        <p>저장</p>
    </button>      
  )
}
