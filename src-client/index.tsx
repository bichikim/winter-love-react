import React, {Suspense, lazy} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const Index = lazy(() => import('pages/index'))
const Foo = lazy(() => import('pages/foo'))
const Fallback = (<div>loading...</div>)

render(
  pug`
    Router
      Suspense(fallback=Fallback)
        Switch
          Route(path="/" component=Index)
          Route(path="/foo" component=Foo)
  `
  ,
  document.getElementById('root')
)
