import React, { FC, useEffect, useState, useCallback } from 'react'
import './Text.sass'

type Props = {
  label: string  
  value: string
  changeValue?: (s: string) => void
  required?: boolean
  regex?: RegExp
  viewValidationResult?: boolean
  isValid?: (b: boolean) => void
}

const Component: FC<Props> = ({

  label,
  value,
  changeValue = () => {},
  required = false,
  regex = null,
  viewValidationResult = false,
  isValid = () => {},

}) => {

  const [valid, setValid] =  useState(false)
  const onChange = useCallback(event => changeValue(event.target.value), [changeValue])

  useEffect(() => {
    let vald = true
    if (value) {
      vald = regex ? regex?.test(value) : true
    }else if (required) {
      vald = false
    }
    isValid(vald)
    setValid(vald)
  }, [value])

  return (
    <div className="compo-text">
    <div className="label">
      <p>{label}</p>
      { required && <span>必須</span> }
    </div>
    <input type="text" value={value} onChange={onChange} />
    { viewValidationResult && !valid &&  <span className="error">入力値が不正です</span> }
  </div>
  )
}
export default Component