import React, { FC } from 'react'

import './Title.sass'

type Props = {
  detail?: string  
  url?: string
  viewNuxtTop?: boolean
}

const Component: FC<Props> = ({

  detail = null,
  url = null,
  viewNuxtTop = false

}) => {

  return (
    <div className="compo-title">
      <h1>AWS 入門</h1>
      <p className="compar">from CodeCommit</p>
      { detail && <p className="detail">{detail}</p> }
      { url && <p className="link">About: <a href={url}>{url}</a></p> }
      { viewNuxtTop && <p className="link"><a href="/nuxt">Nuxt.jsのTop</a></p> }
      <h2>React.js</h2>
    </div>
  )

}

export default Component