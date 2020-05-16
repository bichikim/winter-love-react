import {
  CreateElementLike,
  DivAttributes,
  DomNode,
  HTMLAttributes,
  SpanAttributes,
  ButtonAttributes,
} from './types'

export const optionsSymbol = Symbol('options')
export const createElementSymbol = Symbol('createElement')
export const createElementAdapterSymbol = Symbol('createElementAdapter')
export const elementSymbol = Symbol('element')

export const isElement = (value: any) => {
  const typeOfValue = typeof value
  return value && value[elementSymbol]
    || value === null
    || typeOfValue === 'string'
    || typeOfValue === 'number'
}

export const beArrayClassNames = (classNames?: any) => {

  if(Array.isArray(classNames)) {
    return classNames
  }

  const typeofClassNames = typeof classNames

  if(typeofClassNames === 'undefined') {
    return []
  }

  if(typeofClassNames === 'object') {
    return Object.keys(classNames).filter((key) => {
      return classNames[key]
    })
  }

  if(typeofClassNames === 'string') {
    return classNames.split(' ')
  }

  throw new Error('is it classNames?')
}

export function dom<O extends HTMLAttributes>(type: any) {
  function createElementAdapterPart(createElement: CreateElementLike<any>) {
    function optionsPart(options?: O | DomNode, ...mayChildren: DomNode[]) {
      function createElementPart(...children: DomNode[]) {
        const element = createElement(type, options || {}, ...children)
        return Object.freeze({
          ...element,
          [elementSymbol]: true,
        })
      }
      if(
        isElement(options)
      ) {
        return createElement(type, {}, options, ...mayChildren)
      }

      createElementPart[createElementSymbol] = true

      return createElementPart
    }

    optionsPart[optionsSymbol] = true

    return optionsPart
  }

  createElementAdapterPart[createElementAdapterSymbol] = true

  return createElementAdapterPart
}

export const div = dom<DivAttributes>('div')

export const span = dom<SpanAttributes>('span')

export const button = dom<ButtonAttributes>('button')

export default dom
