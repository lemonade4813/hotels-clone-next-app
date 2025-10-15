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
import CheckboxGroup from "../components/compounds/groups/CheckboxGroup";
import RadioGroup from "../components/compounds/groups/RadioGroup";
import GoogleMap from "../components/GoogleMap";

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
    popularKeywords : string[]
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
                                                  accomType : '',
                                                  popularKeywords : []
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

    // const [selectedPopularKeywords, setSelectedPopularKeywords] = useState<string[]>([]);

    // const toggle = (value: string) => {
    //   setSelectedPopularKeywords((prev) => {
    //     const exists = prev.includes(value);
    //     const newState = exists ? prev.filter((v) => v !== value) : [...prev, value];
    //     return newState;
    //   });
    // };
  
    const popularKeywords = { 
                               title : '인기 필터', 
                               list : [{ label : '강릉', value : 'gangneung'},
                                       { label : '스파', value : 'spa'},
                                       { label : '수영장', value : 'pool'},
                                       { label : '바다 전망', value : 'oceanview'},
                                       { label : '호텔', value : 'hotel'}
                              ],
                              onchange : handleCriteria
                            } 

    const accomTypes = [{ label : '전체', value : 'all'}, 
                        { label : '호텔', value : 'hotel'},
                        { label : '주택', value : 'house'}
                        ]                        


                            
    return(
        <div className={styles.container}>
            <SearchOptions/>
            <div className={styles.content}>
                <div className={styles.asideContainer}>
                <div style={{position : 'relative'}}>
                  <div>
                    <GoogleMap>
                      지도로 보기
                    </GoogleMap>
                  </div>
                </div>
                    <FilteringByName 
                      handleCriteria = { handleCriteria } 
                      value={name}
                    />
                    <div>
                        <p>필터링 기준</p>
                        {/* <FilteringByPopularKeyword /> */}
                        <CheckboxGroup
                          title={popularKeywords.title}
                          list={popularKeywords.list}
                          selectedState={criteria.popularKeywords}
                          name={'popularKeywords'}         
                          onChange={handleCriteria}
                        />
                        <RadioGroup
                           title='숙박 옵션'
                           list={accomTypes}
                           selectedValue={criteria.accomType}
                           name={'accomType'}         
                           onChange={handleCriteria}
                        />
                        {/* <FilteringByAccomType 
                          handleCriteria = { handleCriteria } 
                          value={accomType}
                        /> */}
                        <FilteringByPrice/>
                        {/* <FilteringByAmenities/> */}
                        <FilteringByGrades 
                          handleCriteria = { handleCriteria } 
                          value={grade}
                        />      
                    </div> 
                </div>       
                <div>
                <NoticeDiscount 
                  noticeText="10박을 숙박하면 리워드 1박을 드려요!" 
                  buttonText="로그인하기" 
                  noticeType="reward"
                />
                <AccomList filteredResults={filteredResults} />
                </div>
            </div>
        </div>
    )
}