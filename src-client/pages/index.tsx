import xs from 'xstream'
import {makeComponent} from '@cycle/react'
import {div, span, button} from '@cycle/react-dom'

function index(source) {
  const buttonRef = Symbol('button')

  const button$ = source.react.select(buttonRef).events('click')

  const initialState = {count: 0}


  const state$ = xs.merge(
    button$.mapTo((prevState) => ({
      ...prevState,
      count: prevState.count + 1,
    }))
  )
  .fold((state, fn: any) => fn(state), initialState)

  const react = state$.map((state) => (
    div([
      span('.text', ['hello index', state.count]),
      button(buttonRef, 'click'),
    ])
  ))

  return {
    react,
  }
}

export default makeComponent(index)

