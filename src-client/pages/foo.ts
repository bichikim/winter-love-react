import {FC, useState} from 'react'
import {div} from 'src/dom/react-dom'


const fooSetUp = () => {
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

const foo: FC = () => {
  const {count} = fooSetUp()
  return (
    div({style: {color: 'red'}})(
      div()('foo count: '),
      count,
    )
  )
}

export default foo
