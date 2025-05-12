'use client'

import { gql, useSuspenseQuery } from "@apollo/client"
import Image from "next/image";
import styles from "./Search.module.css";
import searchSvg from  "@/app/assets/search.svg";
import positionSvg from "@/app/assets/position.svg";
import calendarSvg from "@/app/assets/calendar.svg";
import personSvg from "@/app/assets/person.svg";
import starSvg from "@/app/assets/star.svg";
import DualRangeSlider from "../components/DualRangeSlider";
import FilteringOptionAmenities from "./FilteringOptionAmenities";
import { useMemo, useState } from "react";

interface ISearchResult{
    name : string;
    location : string;
    city : string;
    imgUrl : string;
    rating : string;
    isFullRefund : boolean;
    costPrice : number;
    salePrice : number;
    totalPrice : number;
    grade : 1 | 2 | 3 | 4 | 5 | null;
}

type ICriteria = Pick<ISearchResult, "name" | "location"| "grade" | "city">


export default function SearchResult({ keyword } : { keyword : string}) {

    const GET_SEARCH_RESULT = gql`
        query GetSearchResult($keyword: String) {
            result(keyword: $keyword) {
                name
                city
                imgUrl
                location
                rating
                isFullRefund
                costPrice
                salePrice
                totalPrice
                grade
            }
        }
    `
    const { data } = useSuspenseQuery<{ result: ISearchResult[] }>(
            GET_SEARCH_RESULT, 
            { variables  : { keyword }, 
            errorPolicy : 'all'}
    );


    const [criteria, setCrteria] = useState<ICriteria>({ name : '', location : '', city : '', grade : null });

    const filteredResults = useMemo(() => {
        if (!data?.result) return [];
      
        return data.result.filter((item) => {
          for (const key in criteria) {
            const value = criteria[key as keyof ICriteria];
      
            
            if (value === '' || value === null) continue;
            const itemValue = item[key as keyof ISearchResult];
      
            if (typeof value === 'string') {
              if (
                typeof itemValue !== 'string' || 
                !itemValue.includes(value)
              ) {
                return false;
              }
            }
      
            if (typeof value === 'number') {
              if (itemValue !== value) return false;
            }
      
            if (typeof value === 'boolean') {
              if (itemValue !== value) return false;
            }
          }
      
          return true;
        });
      }, [data, criteria]);


    // const searchResult = data?.result ?? [];

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

    return(
        <div className={styles.container}>
        <div className={styles.searchOptionContainer}>
            <div className={styles.searchOption}>
                <div className={styles.searchOptionItem}>
                    <Image src={positionSvg} alt="" width={24}/>
                    <div style={{flex : 1}}>
                        <p>어디로 가세요?</p>
                        <p>한국</p>
                    </div>
                </div>
                <div className={styles.searchOptionItem}>
                    <Image src={calendarSvg} alt=""/>
                    <div style={{flex : 1}}>
                        <p>날짜</p>
                        <p>5월 9일 - 5월 11일</p>
                    </div>
                </div>
                <div className={styles.searchOptionItem}>
                    <Image src={personSvg} alt=""/>
                    <div style={{flex : 1}}>
                        <p>인원 수</p>
                        <p>객실 1개 2명</p>
                    </div>
                </div>
            </div>
            <button className={styles.searchButton}>
                <Image src={searchSvg} alt="검색 버튼 이미지" width={24} height={24}/>
            </button>
        </div>
        <div className={styles.content}>
            <div className={styles.asideContainer}>
                <div>
                    <p>숙박 시설 이름으로 검색</p>
                    <input placeholder="예 : 메리어트" className={styles.searchField}/>
                </div>
                <div>
                    <p>필터링 기준</p>
                    <fieldset style={{border : 'none'}}>
                        <legend>인기 필터</legend>
                        <div>
                            <input type="checkbox" />
                            <label>바다 전망</label>
                        </div>
                        <div>
                            <input type="checkbox"/>
                            <label>스파</label>
                        </div>
                        <div>
                            <input type="checkbox"/>
                            <label>반려동물 동반 가능</label>
                        </div>
                    </fieldset>
                    <fieldset  style={{border : 'none'}}>
                        <legend>숙박 옵션</legend>
                        <div>
                            <input type="radio" id="all" name="accomType"/>
                            <label htmlFor="all">전체</label>
                        </div>
                        <div>
                            <input type="radio" id="hotel" name="accomType"/>
                            <label htmlFor="hotel">호텔</label>
                        </div>
                        <div>
                            <input type="radio" id="residence" name="accomType"/>
                            <label htmlFor="residence">주택</label>
                        </div>
                    </fieldset>
                    <div>
                        <p>가격</p>
                        <DualRangeSlider min={10000} max={100000}/>
                    </div>
                    <div>
                        <p>편의시설/서비스</p>
                        <FilteringOptionAmenities/>
                    </div>
                </div>
                <div>
                    <span>숙박 시설 등급</span>
                    <div className={styles.gradeContainer}>
                       <div className={styles.gradeItem}>
                            <span>1</span>
                            <Image src={starSvg} width={30} height={30} alt="호텔 등급 스타"/>
                       </div> 
                       <div className={styles.gradeItem}>
                            <span>2</span>
                            <Image src={starSvg} width={30} height={30} alt="호텔 등급 스타"/>
                       </div> 
                       <div className={styles.gradeItem}>
                            <span>3</span>
                            <Image src={starSvg} width={30} height={30} alt="호텔 등급 스타"/>
                       </div> 
                       <div className={styles.gradeItem}>
                            <span>4</span>
                            <Image src={starSvg} width={30} height={30} alt="호텔 등급 스타"/>
                       </div> 
                       <div className={styles.gradeItem}>
                            <span>5</span>
                            <Image src={starSvg} width={30} height={30} alt="호텔 등급 스타"/>
                       </div> 
                    </div>
                </div>
            </div>
            <div className={styles.mainContainer}>
            {filteredResults?.map(result => 
                <div key={result.name} 
                     className={styles.hotelInfoContainer}>
                    <Image src={result.imgUrl} 
                        width={200} 
                        height={200} 
                        alt="호텔 이미지" 
                        className={styles.hotelImage}/>
                    <div className={styles.hotelInfoRight}>
                        <div style={{display : 'flex',  boxSizing : 'border-box'}}>
                        <div style={{width : '300px', padding : '10px'}}>
                            <p style={{fontSize : '24px'}}>{result?.name}</p>
                            <p>{result?.city}</p>
                            {result.isFullRefund && <p style={{ color : 'green'}}>전액환불 가능</p>}
                            <div style={{display : 'flex', alignItems :'center', gap : '10px'}}>
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
                </div>
            )}
            </div>
        </div> 
    </div>
    )
}