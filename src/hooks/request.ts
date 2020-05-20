import {useState, SetStateAction, Dispatch} from 'react'
import Axios, {AxiosResponse, AxiosRequestConfig, AxiosInstance} from 'axios'

export type PathFunction<P = any> = (payload: P) => string
export type Path<P = any> = PathFunction<P> | string
export type Params = Record<string, any>
export type Data = Record<string, any>
export type PathParams = Record<string, any> | string
export type Headers = Record<string, any>

export interface DefaultConfig<P = any>
  extends Omit<AxiosRequestConfig, 'url'> {
  url?: Path<P>
  data?: Data
  params?: Params
  headers?: Headers
}

export type RequestAction<
  R extends Record<string | symbol, any> = Record<string | symbol, any>,
  P = any,
  > = (config: Config<P>) => Promise<AxiosResponse<R>>

export type RequestHooks<
  R extends Record<string | symbol, any> = Record<string | symbol, any>,
  P = any
  > = [
  R | undefined,
  RequestAction<R, P>,
  Dispatch<SetStateAction<R | undefined>>,
  AxiosInstance,
]

export interface Config<P = any> extends Omit<DefaultConfig, 'url'> {
  url: P
}

export const getPath = <P = any>(
  path?: Path<P>,
  payload?: P,
): string => {
  if(typeof path === 'function') {
    return path(payload ?? {} as P)
  } else if(typeof path === 'string') {
    return path
  } else if(typeof payload === 'string') {
    return payload
  }
  return path ?? ''
}

export const useRequest = <R extends Record<string | symbol, any> = Record<string | symbol, any>,
  P = any,
  >(defaultConfig: DefaultConfig<P> = {}): RequestHooks<R, P> => {
  const [result, setResult] = useState<R | undefined>(() => undefined)

  const {
    url,
    baseURL = process.env.BASE_URL,
    ...others
  } = defaultConfig

  const axios = Axios.create({
    baseURL,
    ...others,
  })

  const request = (config?: Config<P>) => {
    const {url: pathParams, ...others} = config ?? {}
    const _url = getPath<P>(url, pathParams)
    const promiseAxios = axios({
      ...others,
      url: _url,
    })
    return new Promise<AxiosResponse<R>>((resolve, reject) => {
      promiseAxios.then((result: AxiosResponse<R>) => {
        setResult(() => {
          return result.data
        })
        resolve(result)
      })
      promiseAxios.catch(reject)
    })
  }

  return [
    // result
    result,
    // request & change result
    request,
    // change result without request
    setResult,
    // axios instance
    axios,
  ]
}

export default useRequest
