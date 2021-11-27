import React, {useState, useCallback, useEffect} from 'react'

import useAxios from '../../hooks/axios'

import Title from '../atoms/view/Title'
import Text from '../atoms/input/Text'

import './sono-1.sass'

function App() {

  const axios = useAxios()

  const [inputs, setInputs] = useState({
    name: '',
    nameKana: '',
    email: '',
    age: '',
    zipCode: '',
    address: '',
    tel: '',
    mobileNumber: '',
    hobby: '',
    workTel: '',
  })

  const [valids, setValids] = useState({
    name: false,
    nameKana: false,
    email: false,
    age: false,
    zipCode: false,
    address: false,
    tel: false,
    mobileNumber: false,
    hobby: false,
    workTel: false,
    telOrMobile: false,
    noMobile: false
  })

  const [viewValidationResult, setViewValidationResult] = useState(false)

  useEffect(() => {
    setValids(valids => ({
      ...valids,
      telOrMobile: !!inputs.tel || !!inputs.mobileNumber
    }))
  }, [inputs.tel, inputs.mobileNumber])

  useEffect(() => {
    setValids(valids => ({
      ...valids,
      noMobile: !!inputs.mobileNumber || !!inputs.workTel
    }))
  }, [inputs.mobileNumber, inputs.workTel])

  const onChange = useCallback((key: string, value: string, isValid: boolean) => {
    setInputs(inputs => ({
      ...inputs,
      [key]: value
    }))
    setValids(valids => ({
      ...valids,
      [key]: isValid
    }))
  }, [])

  const send = () => {
    setViewValidationResult(true)
    const valid = Object.values(valids).every(bool => bool)

    if (!valid) return

    /*
    fetch("/api/v1/user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...inputs,
        age: Number(inputs.age),
        zipCode: Number(inputs.zipCode),
      })
    }).then(() => {
      alert('succsess')
      setViewValidationResult(false)
    })
    */

    axios.post('/user', {
      ...inputs,
      age: Number(inputs.age),
      zipCode: Number(inputs.zipCode),
    }).then(() => {
      alert('succsess')
      setViewValidationResult(false)
    })
  }



  return (
    <div className="page-sono-1">
      <Title
        detail="その1"
        url="https://blog.taniguchi.tech/archives/2485"
      />
      <Text
        label="名前"
        keyName="name"
        value={inputs.name}
        onChange={onChange}
        required={true}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="名前(カナ)"
        keyName="nameKana"
        value={inputs.nameKana}
        onChange={onChange}
        regex={/^[ァ-ヶー　]+$/}
        required={true}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="E-Mail"
        keyName="email"
        value={inputs.email}
        onChange={onChange}
        regex={/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/}
        required={true}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="年齢"
        keyName="age"
        value={inputs.age}
        onChange={onChange}
        regex={/^\d{1,3}$/}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="郵便番号"
        keyName="zipCode"
        value={inputs.zipCode}
        onChange={onChange}
        regex={/^\d{7}$/}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="住所"
        keyName="address"
        value={inputs.address}
        onChange={onChange}
        required={true}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="電話番号"
        keyName="tel"
        value={inputs.tel}
        onChange={onChange}
        regex={/^\d{10}$/}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="携帯電話番号"
        keyName="mobileNumber"
        value={inputs.mobileNumber}
        onChange={onChange}
        regex={/^\d{11}$/}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="趣味・特技"
        keyName="hobby"
        value={inputs.hobby}
        onChange={onChange}
        viewValidationResult={viewValidationResult}
      />
      <Text
        label="勤務先電話番号"
        keyName="workTel"
        value={inputs.workTel}
        onChange={onChange}
        regex={/^\d{10,11}$/}
        viewValidationResult={viewValidationResult}
      />
      {
        viewValidationResult &&
        <div className="errors">
          { !valids.telOrMobile && <p>電話番号、もしくは携帯電話番号のいずれか１つは入力が必要です。</p> }
          { !valids.noMobile && <p>携帯電話番号のない方は、勤務先電話番号の入力が必要です。</p>  }
        </div>
      }
      <p className="button" onClick={send}>送信</p>
    </div>
  )
}

export default App
