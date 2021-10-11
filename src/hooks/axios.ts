import { useHistory } from 'react-router-dom'
import axios, { AxiosInstance } from 'axios'

import { setPublicUrl } from '../common/func'

const baseAxios = (() => {

  const baseAxios = axios.create({
    baseURL:'/api/v1'
  })

  baseAxios.interceptors.request.use(config => {
    config.headers = {
      'Content-Type': 'application/json'
    }
    return config
  })

  return baseAxios
})()

let checkHistory: any | undefined
let axiosResponseHandlerId: number | undefined

export default function useAxios(): AxiosInstance {

  const history = useHistory()

  if (history === checkHistory) {
    return baseAxios
  }

  checkHistory = history

  if (axiosResponseHandlerId) {
    baseAxios.interceptors.response.eject(axiosResponseHandlerId)
  }

  axiosResponseHandlerId = baseAxios.interceptors.response.use(value => value,
  error => {
    history.replace(setPublicUrl('/error'), {
      httpStatusCode: error.response.status
    })
  })

  return baseAxios
}