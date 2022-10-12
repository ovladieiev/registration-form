import React from 'react'
import "./formInput.css"

export default function FormInput(props) {
    const [focused, setFocused] = React.useState(false)
    const {label, onChange, id, errorMessage, ...inputProps} = props

    function handleFocus() {
        setFocused(true)
    }

  return (
    <div className='formInput'>
        <label>{label}</label>
        <input 
            {...inputProps}
            onChange={onChange}
            onFocus={()=>inputProps.name==="confirmPassword" && setFocused(true)}
            onBlur={handleFocus}
            focused={focused.toString()}
        />
        <span>{errorMessage}</span>
    </div>
  )
}
