// import { createContext, useContext } from "react"



// type CheckboxContextProps = {
//   id: string
//   isChecked: boolean
//   onChange: () => void
// }

// type CheckboxProps = CheckboxContextProps & React.PropsWithChildren<{}>

// const CheckboxContext = createContext<CheckboxContextProps>({
//   id: '',
//   isChecked: false,
//   onChange: () => {},
// })

// const CheckboxWrapper = ({
//   id,
//   isChecked,
//   onChange,
//   children,
// }: CheckboxProps) => {
//   const value = {
//     id,
//     isChecked,
//     onChange,
//   }
//   return (
//     <CheckboxContext.Provider value={value}>
//       {children}
//     </CheckboxContext.Provider>
//   )
// }

// const useCheckboxContext = () => {
//   const context = useContext(CheckboxContext)
//   return context
// }

// const Checkbox = ({ ...props }) => {
//   const { id, isChecked, onChange } = useCheckboxContext()
//   return (
//     <input
//       type="checkbox"
//       id={id}
//       checked={isChecked}
//       onChange={onChange}
//       {...props}
//     />
//   )
// }

// const Label = ({ children, ...props }: React.PropsWithChildren<{}>) => {
//   const { id } = useCheckboxContext()
//   return (
//     <label htmlFor={id} {...props}>
//       {children}
//     </label>
//   )
// }

// CheckboxWrapper.Checkbox = Checkbox
// CheckboxWrapper.Label = Label

// export default CheckboxWrapper


import React, { createContext, useContext } from "react";
import style from '@/app/components/compounds/checkbox/Checkbox.module.css';

type CheckboxContextProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  selectedState: string[];
};

type CheckboxProps = Partial<CheckboxContextProps> & React.PropsWithChildren<{}>;

const CheckboxContext = createContext<CheckboxContextProps>({
  id: '',
  value: '',
  onChange: () => {},
  selectedState: []
});

const CheckboxWrapper = ({
  id,
  value,
  onChange,
  selectedState,
  children,
}: CheckboxProps) => {
  const ctx = {
    id: id ?? value ?? '',
    value: value ?? '',
    onChange: onChange ?? (() => {}),
    selectedState: selectedState ?? []
  };

  return (
    <CheckboxContext.Provider value={ctx}>
      {children}
    </CheckboxContext.Provider>
  );
};

const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error("Checkbox components must be used within CheckboxWrapper");
  }
  return context;
};

const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { id, value, selectedState, onChange } = useCheckboxContext();

  const checked = selectedState.includes(value);

  const handleChange = () => {
    onChange(value);
  };

  return (
    <input
      className={style.checkbox}
      type="checkbox"
      id={id}
      checked={checked}
      onChange={handleChange}
      {...props}
    />
  );
};

const Label = ({ children, ...props }: React.PropsWithChildren<{}>) => {
  const { id } = useCheckboxContext();
  return (
    <label htmlFor={id} {...props}>
      {children}
    </label>
  );
};

(CheckboxWrapper as any).Checkbox = Checkbox;
(CheckboxWrapper as any).Label = Label;

export default CheckboxWrapper as unknown as React.FC<CheckboxProps> & {
  Checkbox: typeof Checkbox;
  Label: typeof Label;
};
