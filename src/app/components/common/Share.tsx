import ShareSvg from '@/app/assets/common/share.svg';
import Image from 'next/image';
import styles from './Share.module.css';


export default function Share() {
  return (
    <button className={styles.buttonLayout}>
        <Image src={ShareSvg} alt="share image"/>
        <p>공유하기</p>
    </button>      
  )
}
