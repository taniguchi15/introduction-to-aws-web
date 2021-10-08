import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Title from '../atoms/view/Title'

import { setPublicUrl } from '../../common/func'

import './error.sass'

type State = {
  httpStatusCode?: number
}

 const getMessage = (httpStatusCode: number): string => {
  switch (httpStatusCode) {
    case 404:
      return  "ページが見つかりません。"
    case 500:
      return  "サーバーエラーが発生しました。しばらく時間をおいてもう一度実行してください。"
    default:
      return  "エラーが発生しました。"
  }
}

 const viewBackToTopLink = (httpStatusCode: number): boolean => {
  switch (httpStatusCode) {
    case 404:
      return  true
    default:
      return  false
  }
}

const Component: FC = () => {

  const location = useLocation<State>()
  const httpStatusCode = location.state.httpStatusCode || 999

  return (
    <div className="page-error">
      <Title />
      <p className="error">Error</p>
      <p className="code">{httpStatusCode}</p>
      <p>{getMessage(httpStatusCode)}</p>
      { viewBackToTopLink(httpStatusCode) && <Link to={setPublicUrl('/')}>トップへ戻る</Link> }
    </div>
  )
}

export default Component