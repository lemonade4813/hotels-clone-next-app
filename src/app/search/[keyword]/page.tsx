import { Suspense } from "react";
import SearchResult from "../SearchResult";


export default async function Search({ params } : { params : Promise<{ keyword : string}>}) {

  const keyword = (await params).keyword;

  return (
    <Suspense fallback ={<p>로딩중 입니다.</p>}>
        <SearchResult keyword={keyword}/>
    </Suspense>
  )
}
