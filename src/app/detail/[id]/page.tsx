import React, { Suspense } from 'react'
import Detail from './_components/Detail'

export default async function page({ params} : { params : Promise<{ id : string}>}) {

  const id = (await params).id;

  return (
    <Suspense fallback ={<p>로딩중 입니다.</p>}>
      <Detail id={id}/>
    </Suspense>
  )
}
