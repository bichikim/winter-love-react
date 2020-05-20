import {DomNode} from 'src/lib/dom/types'
import {
  div as _div,
  button as _button,
} from './react-dom'
import {isElement, beArrayClassNames} from './dom'

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

class ProxyHandler {
  id: null | string
  classNames: string[]

  constructor(id: null | string = null, classNames: string[] = []) {
    this.id = id
    this.classNames = classNames
  }

  get(target, key) {
    if(typeof key === 'string') {
      const {type, key: myKey} = discernKey(key)

      let proxyHandler

      if(type === 'id') {
        proxyHandler = new ProxyHandler(myKey)
      } else {
        proxyHandler = new ProxyHandler(this.id, [...this.classNames, myKey])
      }

      return new Proxy(target, proxyHandler)
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

const query = <P extends Function>(elementHelper: P) => {

  return new Proxy<P>(elementHelper, new ProxyHandler())
}

export const div = query(_div)

export const button = query(_button)
