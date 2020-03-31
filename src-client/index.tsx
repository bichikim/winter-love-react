import React, {Suspense, lazy} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const Index = lazy(() => import('pages/index'))
const Foo = lazy(() => import('pages/foo'))

render(
  <Router>
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/foo" component={Foo} />
      </Switch>
    </Suspense>
  </Router>
  ,
  document.getElementById('root')
)
