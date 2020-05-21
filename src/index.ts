import {Suspense, lazy} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'src/css/global.styl'
import {dom, div} from 'src/lib/dom/react-dom'


const Index = lazy(() => import(/* webpackMode: "eager" */ 'pages/index'))
const Foo = lazy(() => import('pages/foo'))
const Fallback = div()('loading...')


const router = dom(Router)
const switcher = dom(Switch)
const route = dom(Route)
const suspense = dom(Suspense)

render(
  router(
    suspense({fallback: Fallback})(
      switcher(
        route({path: 'foo', component: Foo})(),
        route({path: '/', component: Index})(),
      )
    )
  )
  ,
  document.getElementById('root')
)
