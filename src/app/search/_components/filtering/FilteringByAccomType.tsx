import React, { memo } from 'react'
import { ICriteria } from '../../SearchResult';


interface FilteringByAcoomTypeProps {
  handleCriteria: <K extends keyof ICriteria>(key: K, value: ICriteria[K]) => void;
  value : string;
}


const accomTypeList = [
                    {value : '', id : 'all', label : '전체'}, 
                    {value : 'hotel', id : 'hotel', label : '호텔'}, 
                    {value : 'residence', id : 'residence', label : '주택'}
                  ]

function FilteringByAccomType({ handleCriteria, value } : FilteringByAcoomTypeProps) {

  return (
    <fieldset  style={{border : 'none'}}>
        <legend>숙박 시설 유형</legend>
        {accomTypeList.map((accom) =>
          <div>
              <input 
                style={{backgroundColor : 'red'}}
        
                type="radio" 
                value={accom.value} 
                checked={accom.value === value}
                id={accom.id} 
                name="accomType" 
                onClick={() => handleCriteria('accomType', accom.value)}
              />
              <label htmlFor="all">{accom.label}</label>
          </div>
        )}
    </fieldset>
  )
}

export default memo(FilteringByAccomType)
