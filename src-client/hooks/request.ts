import {useState} from 'react'
import Axios, {AxiosResponse, AxiosRequestConfig} from 'axios'

export type PathFunction<P extends PathParams | undefined = PathParams> = (payload?: P) => string
export type Path<P extends PathParams | undefined = PathParams> = PathFunction<P> | string
export type Params = Record<string, any>
export type Data = Record<string, any>
export type PathParams = Record<string, any>
export type Headers = Record<string, any>
export interface Config extends Omit<AxiosRequestConfig, 'url'> {
  url?: Path<Payload['pathParams']>
  data?: Data
  params?: Params
  pathParams?: PathParams
  headers?: Headers
}

export type Payload = Omit<Config, 'url'>

export const getPath = <P extends PathParams | undefined = PathParams>(
  path: Path<P> = '',
  payload?: P,
  ): string => {
  if(typeof path === 'function') {
    return path(payload)
  }
  return path
}


export const useRequest = <
  P extends Payload = Config,
  R extends Record<string | symbol, any> = Record<string | symbol, any>
  >(config: Config = {}) => {
  const [result, setResult] = useState<null | R>(() => null)

  const {
    url,
    baseURL = process.env.BASE_URL,
    ...others
  } = config

  const axios = Axios.create({
    baseURL,
    ...others,
  })

  const request = (payload: Omit<P, 'url'> = {} as Omit<P, 'url'>) => {
    const {pathParams, data, params, headers} = payload
    const _url = getPath<P['pathParams']>(url, pathParams)
    axios({
      url: _url,
      data,
      params,
      headers,
    }).then((result: AxiosResponse<R>) => {
      setResult(() => {
        return result.data
      })
    })
  }

  return [result, request, setResult]
}

export default useRequest
