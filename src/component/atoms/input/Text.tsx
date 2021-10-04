import React, { FC, useEffect, useState, useCallback } from 'react'
import './Text.sass'

type Props = {
  label: string  
  keyName: string
  value: string
  onChange?: (key: string, value: string, isValid: boolean) => void
  required?: boolean
  regex?: RegExp
  viewValidationResult?: boolean
}

const Component: FC<Props> = ({

  label,
  value,
  keyName,
  onChange = () => {},
  required = false,
  regex = null,
  viewValidationResult = false,

}) => {

  const [valid, setValid] =  useState(false)

  useEffect(() => {
    if (!required) {
      setValid(true)
      onChange(keyName, value, true)
    } 
  }, [])

  const change = useCallback(event => {
    let vald = true
    const val = event.target.value
    if (val) {
      vald = regex ? regex.test(val) : true
    }else if (required) {
      vald = false
    }
    setValid(vald)
    onChange(keyName, val, vald)
  }, [onChange])

  return (
    <div className="compo-text">
      <div className="label">
        <p>{label}</p>
        { required && <span>必須</span> }
      </div>
      <input type="text" value={value} onChange={change} />
      { viewValidationResult && !valid &&  <span className="error">入力値が不正です</span> }
    </div>
  )
}
export default Component