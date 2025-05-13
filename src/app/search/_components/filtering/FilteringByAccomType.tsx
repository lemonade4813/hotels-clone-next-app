import React from 'react'
import { ICriteria } from '../../SearchResult';

interface FilteringByAcoomTypeProps {
  handleCriteria: <K extends keyof ICriteria>(key: K, value: ICriteria[K]) => void;
}


const accomType = [{value : '', id : 'all', label : '전체'}, 
                   {value : 'hotel', id : 'hotel', label : '호텔'}, 
                   {value : 'residence', id : 'residence', label : '주택'}
                  ]

export default function FilteringByAccomType({handleCriteria} : FilteringByAcoomTypeProps) {
  return (
    <fieldset  style={{border : 'none'}}>
        <legend>숙박 시설 유형</legend>
        {accomType.map((accom) =>
          <div>
              <input type="radio" value={accom.value} id={accom.id} name="accomType" onClick={() => handleCriteria('accomType', accom.value)}/>
              <label htmlFor="all">전체</label>
          </div>
        )}
    </fieldset>
  )
}
