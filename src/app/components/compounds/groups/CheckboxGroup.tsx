// import React from 'react'
// import CheckboxWrapper from '../checkbox/Checkbox'

// export default function CheckBoxGroup({title, list} : {title : string, list : any[]}) {



//   return (
//     <div>
//         <h4>{title}</h4>
//         <CheckboxWrapper>
//             <h4>{title}</h4>
//             {list.map((item))}
//             <CheckboxWrapper.Checkbox value={..}/>
//             <CheckboxWrapper.Label>{}</CheckboxWrapper.Label>


//         </CheckboxWrapper>
//     </div>
//   )
// }

import React from 'react';
import CheckboxWrapper from '../checkbox/Checkbox';
import style from "../checkbox/Checkbox.module.css"
import { ICriteria } from '@/app/search/SearchResult';

type Item = {
  label: string;
  value: string;
};

export default function CheckBoxGroup({
  title,
  list,
  selectedState,
  onChange,
}: {
  title: string;
  list: Item[];
  selectedState: string[];
  onChange: (key: keyof ICriteria, value: string) => void;
}) {
  return (
    <div>
      <h4>{title}</h4>
      <div role="group" aria-label={title}>
        {list.map((item) => (
          <div>
            <CheckboxWrapper
              key={item.value}
              id={item.value}
              value={item.value}
              selectedState={selectedState}
              onChange={() => onChange}
            >

                <CheckboxWrapper.Checkbox />
                <CheckboxWrapper.Label>
                  {item.label}
                </CheckboxWrapper.Label>
    
            </CheckboxWrapper>
          </div>
        ))}
      </div>
    </div>
  );
}
