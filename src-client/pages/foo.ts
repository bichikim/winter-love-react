import xs from 'xstream'
import {makeComponent} from '@cycle/react'
import {div, span} from '@cycle/react-dom'

function foo() {
  const initialState = {}

  const state = xs.merge(

  )
  .fold((state, fn) => fn(state), initialState)

  const react = state.map(() => (
    div([
      span('.text', 'hello foo'),
    ])
  ))

  return {
    react,
  }
}

export default makeComponent(foo)

