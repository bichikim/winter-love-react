import {DomNode} from 'src/lib/dom/types'
import {
  div as _div,
  button as _button,
} from './react-dom'
import {ReactNode} from 'react'
import {isElement, beArrayClassNames} from './dom'
import {dom as _dom} from './react-dom'

const idIdentifiers = '$#'

export const discernKey = (key: string) => {
  if(idIdentifiers.includes(key.charAt(0))) {
    return {
      type: 'id',
      key: key.slice(1),
    }
  }
  return {
    type: 'class',
    key,
  }
}

class QueryInfo {
  id: string | null
  classNames: string[]

  constructor(id: null | string, classNames: string[]) {
    this.id = id
    this.classNames = classNames
  }
}

interface ProxyTarget<P> {
  id: null | string
  classNames: string[]
  elementHelper: P
}

class ProxyHandler<P> {
  id: null | string
  classNames: string[]
  proxy: any
  readonly firstHead: boolean

  constructor(
    firstHead = false,
    id: null | string = null,
    classNames: string[] = [],
    ) {
    this.id = id
    this.classNames = classNames
    this.firstHead = firstHead
  }

  get(target, key): Record<string, P> & P {
    if(typeof key === 'string') {
      const {type, key: myKey} = discernKey(key)

      let id
      let className = [...this.classNames]

      if(type === 'id') {
        id = myKey
      } else {
        className.push(myKey)
      }

      if(this.firstHead) {
        const myProxyHandler = new ProxyHandler<P>(false, id, className)
        const myProxy = new Proxy<Record<string, P> & P>(target, myProxyHandler)
        myProxyHandler.proxy = myProxy
        return myProxy
      }

      this.id = id
      this.classNames = className
      return this.proxy
    }
    throw new Error('key should be string')
  }

  apply(target, thisArg: any, argArray?: any): any {
    const _options: Record<string, any> = {}
    const [options, ...mayChildren] = argArray || []
    if(this.id) {
      _options.id = this.id
    }
    _options.class = this.classNames

    this.id = null
    this.classNames = []

    if(isElement(options)) {
      return target.call(thisArg, _options)(options, ...mayChildren)
    }

    const {class: _classNames, ...otherOptions} = options || {}

    _options.class = [..._options.class, ...beArrayClassNames(_classNames)]

    return target.call(thisArg, {
      ..._options,
      ...otherOptions,
    })
  }
}

export type ProxyChain10<P> = Record<string, P> & P

export type ProxyChain9<P> = Record<string, ProxyChain10<P>> & P

export type ProxyChain8<P> = Record<string, ProxyChain9<P>> & P

export type ProxyChain7<P> = Record<string, ProxyChain8<P>> & P

export type ProxyChain6<P> = Record<string, ProxyChain7<P>> & P

export type ProxyChain5<P> = Record<string, ProxyChain6<P>> & P

export type ProxyChain4<P> = Record<string, ProxyChain5<P>> & P

export type ProxyChain3<P> = Record<string, ProxyChain4<P>> & P

export type ProxyChain2<P> = Record<string, ProxyChain3<P>> & P

export type ProxyChain1<P> = Record<string, ProxyChain2<P>> & P

export type ProxyChain0<P> = Record<string, ProxyChain1<P>> & P

export type ProxyChain<P> = Record<string, ProxyChain0<P>> & P

const query = <P>(elementHelper: P) => {
  const myProxyHandler = new ProxyHandler<P>(true)
  const myProxy = new Proxy<ProxyChain<P>>(
    elementHelper as any,
    myProxyHandler,
  )
  myProxyHandler.proxy = myProxy
  return myProxy
}

export const div = query(_div)

export const button = query(_button)

export const dom = (type?: any, ...mayChildren: ReactNode[]) => {
  return query(_dom(type, ...mayChildren))
}
