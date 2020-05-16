import {
  CreateElementLike,
  DivAttribute,
  DomNode,
  HTMLAttribute,
  SpanAttribute,
  ButtonAttribute,
} from './types'

export const optionsSymbol = Symbol('options')
export const createElementSymbol = Symbol('createElement')
export const createElementAdapterSymbol = Symbol('createElementAdapter')
export const elementSymbol = Symbol('element')

export function dom<O extends HTMLAttribute>(type: any) {
  function createElementAdapterPart(createElement: CreateElementLike<any>) {
    function optionsPart(options?: O | DomNode, ...mayChildren: DomNode[]) {
      function createElementPart(...children: DomNode[]) {
        const element = createElement(type, options || {}, ...children)
        return Object.freeze({
          ...element,
          [elementSymbol]: true,
        })
      }
      const optionsTypeOf = typeof options
      if(
        options && options[elementSymbol]
        || options === null
        || optionsTypeOf === 'string'
        || optionsTypeOf === 'number'
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

export const div = dom<DivAttribute>('div')

export const span = dom<SpanAttribute>('span')

export const button = dom<ButtonAttribute>('button')

export default dom
