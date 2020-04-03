import {useState} from 'react'
import Axios, {AxiosResponse} from 'axios'

const axios = Axios.create({
  // todo add env.BASE_URL
  // path: process.env.BASE_URL
})

export type PathFunction<P extends PathParams | undefined = PathParams> = (payload?: P) => string
export type Path<P extends PathParams | undefined = PathParams> = PathFunction<P> | string
export type Params = Record<string, any>
export type Data = Record<string, any>
export type PathParams = Record<string, any>
export type Headers = Record<string, any>
export interface Payload {
  data?: Data
  params?: Params
  pathParams?: PathParams
  headers?: Headers
}

export const getPath = <P extends PathParams | undefined = PathParams>(
  path: Path<P>,
  payload?: P,
  ): string => {
  if(typeof path === 'function') {
    return path(payload)
  }
  return path
}

export const useRequest = <
  P extends Payload = Payload,
  R extends Record<string | symbol, any> = Record<string | symbol, any>
  >(path: Path<P['pathParams']>) => {
  const [result, setResult] = useState<null | R>(() => null)

  const request = (payload: P = {} as P) => {
    const {pathParams, data, params, headers} = payload
    const url = getPath<P['pathParams']>(path, pathParams)
    axios({
      url,
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
