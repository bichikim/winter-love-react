import {FunctionComponent, ReactElement, useState} from 'react'
import {div} from 'src/dom/react-dom'


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
  const {count} = data
  return (
    div({style: {color: 'red'}})(
      div('index count: '),
      count,
    )
  )
}

const index: FunctionComponent = function () {
  const data = indexSetUp()
  return indexRender(data)
}

export default index
