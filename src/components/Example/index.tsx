import React, {useState, FunctionComponent} from 'react'
import './index.scoped.styl'
import {div, button} from 'src/lib/dom/query-react-dom'

interface Props {
  count: number
}

// From https://reactjs.org/docs/hooks-state.html
const Example: FunctionComponent<Props> = ({count: parentCount = 0}) => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0)
  const message = `You clicked ${count} times`

  return div(
    div.message(`Parent Count is ${parentCount} times`),
    div.message(message),
    button({type: 'button', onClick: () => setCount(count + 1)})('Click me')
  )
}

export default Example
