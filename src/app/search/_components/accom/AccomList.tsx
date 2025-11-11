import React from 'react'
import styles from "../../Search.module.scss";
import { ISearchResult } from '../../SearchResult';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const getCommentByRating = (rating : number) => {

    if(rating >= 9.4){
        return '최고에요'
    }
    else if(rating >= 9.0){
        return '매우 훌륭해요'
    }
    else if(rating >= 8.4){
        return '휼륭해요'
    }
    else{
        return null;
    }
}

export default function AccomList({ filteredResults } : { filteredResults : ISearchResult[] }) {

  const router = useRouter();


  return (
    <div className={styles.mainContainer} >
            {filteredResults?.map(result => 
                <div key={result.name} 
                     onClick={() => router.push(`/detail/${result._id}`)}
                     className={styles.hotelInfoContainer}>
                    <Image src={result.imgUrl} 
                        width={200} 
                        height={200} 
                        alt="호텔 이미지" 
                        className={styles.hotelImage}/>
                    <div className={styles.hotelInfoRight}>
                        <div className={styles.hotelDetailInfo}>
                            <p style={{fontSize : '24px'}}>{result?.name}</p>
                            <p>{result?.city}</p>
                            {result.isFullRefund && <p style={{ color : 'green'}}>전액환불 가능</p>}
                            <div className={styles.ratingWrapper}>
                                <p className={styles.rating}>{result?.rating}</p>
                                <p>{getCommentByRating(Number(result?.rating))}</p>
                            </div>
                        </div>   
                        <div className={styles.priceInfoWrapper}>
                            <label htmlFor="compare"> <input id = "compare" type="checkbox"/>비교</label>
                            <div className={styles.priceInfo}>
                                <div>
                                    <span className={styles.costPrice}>
                                        ₩ {result.costPrice.toLocaleString()}
                                    </span>
                                    <span className={styles.salePrice}>
                                        ₩ {result.salePrice.toLocaleString()}
                                    </span>
                                </div>
                                <div>
                                    <p>총 요금 : ₩ 
                                        <span>
                                            {result.totalPrice.toLocaleString()}
                                        </span>
                                    </p>
                                    <p className={styles.taxInclude}>세금 및 수수료 포함</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
          
            )}
            </div>
  )
}
