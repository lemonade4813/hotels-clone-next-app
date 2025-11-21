import { ICriteria } from '@/app/search/SearchResult';
import React from 'react'
import RadioWrapper from '../radio/Radio';
import style from '../radio/Radio.module.css';

type Item = {
    label: string;
    value: string;
};


export default function RadioGroup({
    title,
    list,
    name,
    selectedValue,
    onChange,
  }: {
    title: string;
    list: Item[];
    name : keyof ICriteria;
    selectedValue: string;
    onChange: (key: keyof ICriteria, value: string) => void;
  }) {
    return(
    <div style={{ marginTop : '20px', marginBottom : '20px'}}>
        <h4 style={{ marginBottom : '8px'}}>{title}</h4>
        <div role="group" aria-label={title}>
        {list.map((item) => (
          <div className={style.radiobuttonWrapper}>
            <RadioWrapper
              key={item.value}
              id={item.value}
              value={item.value}
              selectedValue={selectedValue}
              onChange={(value : any) => onChange(name, value)}
            >
                <RadioWrapper.Radio />
                <RadioWrapper.Label>
                  {item.label}
                </RadioWrapper.Label>    
            </RadioWrapper>
          </div>
        ))}
        </div>
    </div>
  )
}
