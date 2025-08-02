'use client'

import { gql, useSuspenseQuery } from "@apollo/client"
import styles from "./Search.module.scss";
import  { useCallback, useMemo, useState } from "react";
import FilteringByAccomType from "./_components/filtering/FilteringByAccomType";
import SearchOptions from "./_components/searchOptions/SearchOptions";
import AccomList from "./_components/accom/AccomList";
import FilteringByPopularKeyword from "./_components/filtering/FilteringByPopularKeyword";
import FilteringByPrice from "./_components/filtering/FilteringByPrice";
//import FilteringByAmenities from "./FilteringByAmenities";
import FilteringByGrades from "./_components/filtering/FilteringByGrades";
import FilteringByName from "./_components/filtering/FilteringByName";
import NoticeDiscount from "../components/NoticeDiscount";

export interface ISearchResult{
    _id : string;
    name : string;
    location : string;
    city : string;
    imgUrl : string;
    rating : string;
    isFullRefund : boolean;
    costPrice : number;
    salePrice : number;
    totalPrice : number;
    grade : 1 | 2 | 3 | 4 | 5;
    accomType : string;
}

export interface ICriteria {
    name : string; 
    location: string ;  
    grade :  1 | 2 | 3 | 4 | 5 | null;  
    city : string; 
    accomType : string;
}

export default function SearchResult({ keyword } : { keyword : string}) {

    const GET_SEARCH_RESULT = gql`
        query GetSearchResult($keyword: String) {
            result(keyword: $keyword) {
                _id
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


    const [criteria, setCriteria] = useState<ICriteria>(
                                                { name : '', 
                                                  location : '', 
                                                  city : '', 
                                                  grade : null , 
                                                  accomType : ''
                                                });
    const { name, location, city, grade, accomType } = criteria;        
    
    
    console.log(data?.result[0]._id)

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
      
            // if (typeof value === 'number') {
            //   if (itemValue !== value) return false;
            // }
      
            if (typeof value === 'boolean') {
              if (itemValue !== value) return false;
            }
          }
      
          return true;
        });
      }, [data, criteria]);


    // // const searchResult = data?.result ?? [];

    const handleCriteria = useCallback(
        <K extends keyof ICriteria>(key: K, value: ICriteria[K]) => {
          setCriteria((prev) => {
            const prevValue = prev[key];
  
            if (Array.isArray(prevValue) && typeof value === "string") {
            // if (Array.isArray(prevValue)) {
              const exists = prevValue.includes(value);
              const updatedArray = exists
                ? prevValue.filter((item) => item !== value) 
                : [...prevValue, value];                   
      
              return {
                ...prev,
                [key]: updatedArray,
              };
            }
      
            return {
              ...prev,
              [key]: value,
            };
          });
        },
        []
      );

    return(
        <div className={styles.container}>
            <SearchOptions/>
            <div className={styles.content}>
                <div className={styles.asideContainer}>
                    <FilteringByName handleCriteria = { handleCriteria } value={name}/>
                    <div>
                        <p>필터링 기준</p>
                        <FilteringByPopularKeyword />
                        <FilteringByAccomType handleCriteria = { handleCriteria } value={accomType}/>
                        <FilteringByPrice/>
                        {/* <FilteringByAmenities/> */}
                        <FilteringByGrades handleCriteria={ handleCriteria } value={grade}/>      
                    </div> 
                </div>       
                <div>
                <NoticeDiscount noticeText="10박을 숙박하면 리워드 1박을 드려요!" buttonText="로그인하기" noticeType="reward"/>
                <AccomList filteredResults={filteredResults} />
                </div>
            </div>
        </div>
    )
}