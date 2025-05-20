import React, { Suspense } from 'react'
import Detail from './_components/Detail'

export default function page({ params} : { params : { id : string }}) {
  return (
    <Suspense fallback ={<p>로딩중 입니다.</p>}>
      <Detail id={params.id}/>
    </Suspense>
  )
}
