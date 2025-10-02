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
  name,
}: {
  title: string;
  list: Item[];
  selectedState: string[];
  onChange: (key: keyof ICriteria, value: string) => void;
  name: keyof ICriteria;  
}) {
  return (
    <div>
      <h4>{title}</h4>
      <div role="group" aria-label={title}>
        {list.map((item) => (
          <div className={style.checkboxWrapper}>
            <CheckboxWrapper
              key={item.value}
              id={item.value}
              value={item.value}
              selectedState={selectedState}
              onChange={(value) => onChange(name, value)}
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
