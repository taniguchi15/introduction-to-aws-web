import React, {useState, useCallback, useEffect} from 'react'
import Text from './component/atoms/input/Text'
import Title from './component/atoms/view/Title'

import './App.sass'

function App() {

  const [name, setName] = useState('')
  const [nameKana, setNameKana] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [address, setAddress] = useState('')
  const [tel, setTel] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [hobby, setHobby] = useState('')
  const [workTel, setWorkTel] = useState('')

  const [viewValidationResult, setViewValidationResult] = useState(false)

  const [isValidName, setIsValidName] = useState(false)
  const [isValidNameKana, setIsValidNameKana] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidAge, setIsValidAge] = useState(false)
  const [isValidZipCode, setIsValidZipCode] = useState(false)
  const [isValidAddress, setIsValidAddress] = useState(false)
  const [isValidTel, setIsValidTel] = useState(false)
  const [isValidMobileNumber, setIsValidMobileNumber] = useState(false)
  const [isValidHobby, setIsValidHobby] = useState(false)
  const [isValidWorkTel, setIsValidWorkTel] = useState(false)

  const [isValidTelOrMobile, setValidTelOrMobile] = useState(false)
  const [isValidNoMobile, setValidNoMobile] = useState(false)

  useEffect(() => {
    setValidTelOrMobile(!!tel || !!mobileNumber)
  }, [tel, mobileNumber])

  useEffect(() => {
    setValidNoMobile(!!mobileNumber || !!workTel)
  }, [mobileNumber, workTel])

  const send = useCallback(() => {
    setViewValidationResult(true)

    const valid = isValidName &&
      isValidNameKana &&
      isValidEmail &&
      isValidAge &&
      isValidZipCode &&
      isValidAddress &&
      isValidTel &&
      isValidMobileNumber &&
      isValidHobby &&
      isValidWorkTel &&
      isValidTelOrMobile &&
      isValidNoMobile

    if (!valid) return

    fetch("/api/v1/user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        nameKana,
        email,
        age: Number(age),
        zipCode: Number(zipCode),
        address,
        tel,
        mobileNumber,
        hobby,
        workTel,
      })
    }).then((val: Response) => {
      alert('succsess')
      setViewValidationResult(false)
    })
  },[name, nameKana, email, age, zipCode, address, tel, mobileNumber, hobby, workTel, isValidName, isValidNameKana, isValidEmail, isValidAge, isValidZipCode, isValidAddress, isValidTel, isValidMobileNumber, isValidHobby, isValidWorkTel, isValidTelOrMobile, isValidNoMobile])


  return (
    <div className="page-sono-1">
      <Title
        detail="その1"
        url="https://blog.taniguchi.tech/archives/547"
      />
      <Text
        label="名前"
        value={name}
        changeValue={setName}
        required={true}
        viewValidationResult={viewValidationResult}
        isValid={setIsValidName}
      />
      <Text
        label="名前(カナ)"
        value={nameKana}
        changeValue={setNameKana}
        regex={/^[ァ-ヶー　]+$/}
        required={true}
        viewValidationResult={viewValidationResult}
        isValid={setIsValidNameKana}
      />
      <Text
        label="E-Mail"
        value={email}
        changeValue={setEmail}
        regex={/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}
        required={true}
        viewValidationResult={viewValidationResult}
        isValid={setIsValidEmail}
      />
      <Text
        label="年齢"
        value={age}
        changeValue={setAge}
        regex={/^\d{1,3}$/}
        viewValidationResult={viewValidationResult}
        isValid={setIsValidAge}
      />
      <Text
        label="郵便番号"
        value={zipCode}
        changeValue={setZipCode}
        regex={/^\d{7}$/}
        viewValidationResult={viewValidationResult}
        isValid={setIsValidZipCode}
      />
      <Text
        label="住所"
        value={address}
        changeValue={setAddress}
        required={true}
        viewValidationResult={viewValidationResult}
        isValid={setIsValidAddress}
      />
      <Text
        label="電話番号"
        value={tel}
        changeValue={setTel}
        regex={/^\d{10}$/}
        viewValidationResult={viewValidationResult}
        isValid={setIsValidTel}
      />
      <Text
        label="携帯電話番号"
        value={mobileNumber}
        changeValue={setMobileNumber}
        regex={/^\d{11}$/}
        viewValidationResult={viewValidationResult}
        isValid={setIsValidMobileNumber}
      />
      <Text
        label="趣味・特技"
        value={hobby}
        changeValue={setHobby}
        viewValidationResult={viewValidationResult}
        isValid={setIsValidHobby}
      />
      <Text
        label="勤務先電話番号"
        value={workTel}
        changeValue={setWorkTel}
        regex={/^\d{10,11}$/}
        viewValidationResult={viewValidationResult}
        isValid={setIsValidWorkTel}
      />
      {
        viewValidationResult &&
        <div className="errors">
          { !isValidTelOrMobile && <p>電話番号、もしくは携帯電話番号のいずれか１つは入力が必要です。</p> }
          { !isValidNoMobile && <p>携帯電話番号のない方は、勤務先電話番号の入力が必要です。</p>  }
        </div>
      }
      <p className="button" onClick={send}>送信</p>
    </div>
  )
}

export default App
