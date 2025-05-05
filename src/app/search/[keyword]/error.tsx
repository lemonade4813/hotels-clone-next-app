"use client"

import React from 'react'

export default function Error({error} : {error : Error}) {
  return (
    <div>에러가 발생했습니다 : {error.message}</div>
  )
}
