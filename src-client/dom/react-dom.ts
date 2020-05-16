import {
  createElement,
  ReactElement,
  Fragment, ReactNode,
} from 'react'
import {
  div as _div,
  span as _span,
  button as _button,
  dom as _dom,
  elementSymbol,
} from './dom'

import {CreateElementLike, HTMLAttributes} from './types'

export type DomAttribute = HTMLAttributes & Record<string, any>

const createReactProps = (options: Record<any, any>): Record<any, any> => {
  if(typeof options === 'object' && !Array.isArray(options)) {
    const {class: className, ...others} = options

    const props = {
      ...others,
    }

    // filter empty array className
    if(className && (Array.isArray(className) && className.length > 0)) {
      props.className = className
    }

    return props
  }
  return {}
}

const createElementAdapter: CreateElementLike<ReactElement>
  = (type: string, options: any, ...children) => {
  const reactProps = createReactProps(options)
  return createElement(type, reactProps, ...children)
}

export const div = _div(createElementAdapter)

export const span = _span(createElementAdapter)

export const button = _button(createElementAdapter)

export const fragment = _dom(Fragment)(createElementAdapter)({})

export const dom = (type?: any, ...mayChildren: ReactNode[]) => {
  if(type[elementSymbol]) {
    return fragment(type, ...mayChildren)
  }

  return _dom<DomAttribute>(type)(createElementAdapter)
}
