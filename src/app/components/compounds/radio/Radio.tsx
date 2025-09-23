import { createContext, useContext } from "react"


type RadioContextProps = {
  id: string
  isChecked: boolean
  onChange: () => void
}

type RadioProps = RadioContextProps & React.PropsWithChildren<{}>

const RadioContext = createContext<RadioContextProps>({
  id: '',
  isChecked: false,
  onChange: () => {},
})

const RadioWrapper = ({
  id,
  isChecked,
  onChange,
  children,
}: RadioProps) => {
  const value = {
    id,
    isChecked,
    onChange,
  }
  return (
    <RadioContext.Provider value={value}>
      {children}
    </RadioContext.Provider>
  )
}

const useRadioContext = () => {
  const context = useContext(RadioContext);
  return context
}

const Radio = ({ ...props }) => {
  const { id, isChecked, onChange } = useRadioContext()
  return (
    <input
      type="radio"
      id={id}
      checked={isChecked}
      onChange={onChange}
      {...props}
    />
  )
}

const Label = ({ children, ...props }: React.PropsWithChildren<{}>) => {
  const { id } = useRadioContext()
  return (
    <label htmlFor={id} {...props}>
      {children}
    </label>
  )
}

RadioWrapper.Checkbox = Radio
RadioWrapper.Label = Label

export default RadioWrapper;