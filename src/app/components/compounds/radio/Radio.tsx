import { createContext, useContext } from "react"
import style from "../radio/Radio.module.css";


type RadioContextProps = {
  id: string
  value : string
  onChange: (value: string) => void;
  selectedValue : any
}

type RadioProps = RadioContextProps & React.PropsWithChildren<{}>

const RadioContext = createContext<RadioContextProps>({
  id: '',
  value : '',
  selectedValue : '',
  onChange: () => {},
})

const RadioWrapper = ({
  id,
  onChange,
  children,
  value,
  selectedValue
}: RadioProps) => {
  const ctx = {
    id,
    onChange,
    value,
    selectedValue
  }
  return (
    <RadioContext.Provider value={ctx}>
      {children}
    </RadioContext.Provider>
  )
}

const useRadioContext = () => {
  const context = useContext(RadioContext);
  return context
}

const Radio = ({ ...props }) => {
  const { id, onChange, selectedValue, value } = useRadioContext()

  const handleChange = () => {
    onChange(value);
  };

  return (
    <input
      className={style.radiobutton}
      type="radio"
      id={id}
      value={value}
      checked={selectedValue === value}
      onChange={handleChange}
      {...props}
    />
  )
}

const Label = ({ children, ...props }: React.PropsWithChildren<{}>) => {
  const { id } = useRadioContext()
  return (
    <label htmlFor={id} {...props} className={style.radioLabel}>
      {children}
    </label>
  )
}

RadioWrapper.Radio = Radio
RadioWrapper.Label = Label

export default RadioWrapper;