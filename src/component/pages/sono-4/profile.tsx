import React from 'react'
import { useSelector } from 'react-redux'

import { State } from '../../../stores'

import Title from '../../atoms/view/Title'
import Profile from '../../atoms/view/Profile'

import './profile.sass'

function App() {

  const userId = useSelector((state: State) => state.auth.userId)

  return (
    <div className="page-sono-4">
      <Title
        detail="その4"
        url="https://blog.taniguchi.tech/archives/547"
      />
      <p className="contents">Profile</p>
      <div className="profile">
        <Profile />
        <p className="user-id">User ID</p>
        <p>{ userId }</p>
      </div>
    </div>
  )
}

export default App
