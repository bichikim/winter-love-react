import {FunctionComponent, FunctionComponentElement, ReactElement, useState} from 'react'
import {div, button} from 'src/lib/dom/query-react-dom'
import {dom} from 'src/lib/dom/react-dom'
import componentMixer from 'src/lib/component-mixer'
import Example from 'components/Example'
import {saveUser, useGlobalState} from 'src/stores/user'

export interface RenderData {
  count: number
  id: string | null
  name: string | null
  email: string | null
  saveUser(data: {id: string, name: string, email: string}): void
}

export const indexSetUp = () => {
  const [count, setCount] = useState(0)
  const [id] = useGlobalState('id')
  const [name] = useGlobalState('name')
  const [email] = useGlobalState('email')
  return Object.freeze({
    get count(): number {
      return count
    },
    set count(value: number) {
      setCount(value)
    },
    id,
    name,
    email,
    saveUser,
  })
}

const example = dom(Example)

export const indexRender = <P>(data: RenderData): FunctionComponentElement<P> => {

  return (
    div.$foo.bar.john({style: {color: 'red'}})(
      div['#foo-sec']('index count: '),
      div(data.count),
      button({onClick: () => {data.count = data.count + 1}})(
        'click',
      ),
      div('----------------------'),
      example({count: data.count})(),
      div('----------------------'),
      button({onClick: () => data.saveUser({id: '0', name: 'foo', email: 'foo@foo.com'})})(
        'save user'
      ),
      div(data.id),
      div(data.name,
      div(data.email)),
    )
  )
}

const index = componentMixer('Index', indexSetUp, indexRender)

export default index
