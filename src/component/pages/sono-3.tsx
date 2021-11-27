import React from 'react'

import useAxios from '../../hooks/axios'

import Title from '../atoms/view/Title'

import './sono-3.sass'

function App() {

  const axios = useAxios()

  const postSuccess = () => {
    axios.post('/success').then(() => {
      alert('success')
    })
  }

  const postBadRequest = () => {
    axios.post('/badrequest')
  }

  const postServerError = () => {
    axios.post('/servererror')
  }

  return (
    <div className="page-sono-3">
      <Title
        detail="その3"
        url="https://blog.taniguchi.tech/archives/2485"
      />
      <p className="contents">3種類のAPI</p>
      <div className="buttons">
        <div
          className="button success"
          onClick={postSuccess}
        >
          <p className="result">Succsess</p>
          <p>POST</p>
        </div>
        <div
          className="button bad-request"
          onClick={postBadRequest}
        >
          <p className="result">Bad Request</p>
          <p>POST</p>
        </div>
        <div
          className="button server-error"
          onClick={postServerError}
        >
          <p className="result">Server Error</p>
          <p>POST</p>
        </div>
      </div>
    </div>
  )
}

export default App
