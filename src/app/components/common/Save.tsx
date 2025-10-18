import Image from 'next/image'
import SaveSvg from '@/app/assets/common/save.svg';

export default function Save() {
  return (
    <button>
        <Image src={SaveSvg} alt="save image"/>
        <p>공유하기</p>
    </button>      
  )
}
