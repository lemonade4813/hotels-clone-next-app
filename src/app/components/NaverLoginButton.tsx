'use client'

import React from 'react';
import { getNaverLoginUrl } from '../lib/loginUrl';
import naverSvg from '@/app/assets/common/naver.svg'
import Image from 'next/image';
declare global {
  interface Window {
    naver: any;
  }
}

const NaverLoginButton = () => {
    const handleLoginClick = () => {
        const url = getNaverLoginUrl();
        window.open(url, 'naverLogin', 'width=600,height=600');
      };

      return(
        <Image src={naverSvg} alt='네이버' onClick={handleLoginClick}/>
      )
};

export default NaverLoginButton;