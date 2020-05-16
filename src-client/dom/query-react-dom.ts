import {DomNode} from 'src-client/dom/types'
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

const query = <P extends Function>(elementHelper: P) => {
  let id: string | null = null
  let classNames: string[] = []
  const _elementHelper = (options: any, ...mayChildren: DomNode[]) => {
    const _options: Record<string, any> = {}
    if(id) {
      _options.id = id
    }
    _options.class = classNames

    id = null
    classNames = []

    if(isElement(options)) {
      return elementHelper(_options)(options, ...mayChildren)
    }

    const {class: _classNames, ...otherOptions} = options || {}

    _options.class = [..._options.class, ...beArrayClassNames(_classNames)]

    return elementHelper({
      ..._options,
      ...otherOptions,
    })
  }

  const queryElementHelper =  new Proxy<Record<string, P>>(_elementHelper as any, {
    get(target, key) {
      if(typeof key === 'string') {
        const {type, key: myKey} = discernKey(key)

        if(type === 'id') {
          id = myKey
        } else {
          classNames.push(myKey)
        }

        return queryElementHelper
      }
      throw new Error('key should be string')
    },
  })

  return queryElementHelper
}

export const div = query(_div)

export const button = query(_button)
