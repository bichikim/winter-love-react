import React, {useState} from 'react'
import './index.scoped.styl'


// From https://reactjs.org/docs/hooks-state.html
export default function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0)
  const message = `You clicked ${count} times`

  // return (
  //   <div>
  //     <p className="message">{message}</p>
  //     <button type="button" onClick={() => setCount(count + 1)}>
  //       Click me
  //     </button>
  //   </div>
  // )

  return pug`
    div hello
  `
}