'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './LoginModal.module.css'

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const loginModalRef = useRef<HTMLDivElement | null>(null)

  const toggleLoginModal = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleOutsideClose = (e: MouseEvent) => {
      if (isOpen && loginModalRef.current && !loginModalRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClose)
    return () => document.removeEventListener('click', handleOutsideClose)
  }, [isOpen])

  return (
    <li className={styles.loginContainer}>
      <p onClick={toggleLoginModal} className={styles.loginTrigger}>로그인</p>
      {isOpen && (
        <div ref={loginModalRef} className={styles.loginModal}>
          <p className={styles.loginInfoText}>회원은 로그인 시 전 세계 10만여 개 호텔 10% 이상 할인</p>
          <button className={styles.loginButton}>로그인</button>
          <p className={styles.signupText}>지금 무료 가입</p>
          <p className={styles.customerOptionText}>고객 의견</p>
        </div>
      )}
    </li>
  )
}