import {FunctionComponent, ReactElement, useState} from 'react'
import {button} from 'src/dom/react-dom'
import {div} from 'src/dom/query-react-dom'

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

export const indexRender = (data: RenderData): ReactElement => {
  return (
    div.$foo.bar.john({style: {color: 'red'}})(
      div['#foo-sec']('index count: '),
      div(data.count),
      button({onClick: () => {data.count = data.count + 1}})(
        'click',
      )
    )
  )
}

const index: FunctionComponent = function () {
  const data = indexSetUp()
  return indexRender(data)
}

export default index
