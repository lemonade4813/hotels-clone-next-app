import ShareSvg from '@/app/assets/common/share.svg';
import Image from 'next/image';


export default function Share() {
  return (
    <button>
        <Image src={ShareSvg} alt="share image"/>
        <p>공유하기</p>
    </button>      
  )
}
