import {Suspense, lazy} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'src/css/global.styl'
import {dom, div} from 'src/dom/react-dom'


const Index = lazy(() => import(/* webpackMode: "eager" */ 'pages/index'))
const Foo = lazy(() => import('pages/foo'))
const Fallback = div()('loading...')

render(
  dom(Router)(
    dom(Suspense)({fallback: Fallback})(
      dom(Switch)(
        dom(Route)({path: 'foo', component: Foo})(),
        dom(Route)({path: '/', component: Index})(),
      )
    )
  )
  ,
  document.getElementById('root')
)
