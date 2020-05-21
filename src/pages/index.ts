import {FunctionComponent, FunctionComponentElement, ReactElement, useState} from 'react'
import {div, button} from 'src/lib/dom/query-react-dom'
import {dom} from 'src/lib/dom/react-dom'
import componentMixer from 'src/lib/component-mixer'
import Example from 'components/Example'

export interface RenderData {
  count: number
}

export const indexSetUp = () => {
  const [count, setCount] = useState(0)
  return Object.freeze({
    get count(): number {
      return count
    },
    set count(value: number) {
      setCount(value)
    },
  })
}

const example = dom(Example)

export const indexRender = <P>(data: RenderData): FunctionComponentElement<P> => {

  return (
    div.$foo.bar.john({style: {color: 'red'}})(
      div['#foo-sec']('index count: '),
      div(data.count),
      button({onClick: () => {data.count = data.count + 1}})(
        'click',
      ),
      div('----------------------'),
      example({count: data.count})()
    )
  )
}

const index: FunctionComponent = componentMixer(indexSetUp, indexRender)

export default index
