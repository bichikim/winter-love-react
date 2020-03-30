import React, {useState} from 'react'
import './index.scoped.styl'


// From https://reactjs.org/docs/hooks-state.html
export default function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0)
  const message = `You clicked ${count} times`

  return pug`
    div
      p.message #{message}
      button(type="button" onClick=() => setCount(count + 1)) Click me
  `
}
