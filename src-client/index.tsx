import React, {Suspense, lazy} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'src/css/global.styl'

const Index = lazy(() => import(/* webpackMode: "eager" */ 'pages/index'))
const Foo = lazy(() => import('pages/foo'))
const Fallback = pug`div loading...`

render(
  pug`
    Router
      Suspense(fallback=Fallback)
        Switch
          Route(path="/foo" component=Foo)
          Route(path="/" component=Index)
  `
  ,
  document.getElementById('root')
)
