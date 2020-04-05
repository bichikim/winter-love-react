import {useRequest} from 'src/hooks/request'
import MockAdapter from 'axios-mock-adapter'
import flushPromises from 'flush-promises'

import React, {useEffect} from 'react'
// noinspection TypeScriptPreferShortImport
import {shallow} from '../enzyme'

interface PathParams {
  where: string
}

interface Response {
  foo: string
}

describe('hooks/request', function test() {
  it('should return getResult, request and setResult', function test() {

    {
      const MockComponent = () => {
        const [get, request, set] = useRequest()
        expect(get).to.be.an('undefined')
        expect(request).to.be.a('function')
        expect(set).to.be.a('function')
        return <div> {get} </div>
      }
      const wrapper = shallow(<MockComponent />)
      expect(wrapper.html()).to.equal('<div>  </div>')
    }
    {
      const MockComponent = () => {
        const [get, request, set] = useRequest({})
        expect(get).to.be.an('undefined')
        expect(request).to.be.a('function')
        expect(set).to.be.a('function')
        return <div> {get} </div>
      }
      const wrapper = shallow(<MockComponent />)
      expect(wrapper.html()).to.equal('<div>  </div>')
    }
  })
  it('should request with function url', async function test() {
    const MockComponent = () => {
      const result = {
        foo: 'bar',
      }
      const [get, request, set, axios]
        = useRequest<Response, PathParams>({
        url: ({where}) => (`foo/${where}`),
      })
      const mock = new MockAdapter(axios)
      mock.onGet('foo/bar').reply(200, result)

      useEffect(() => {
        console.log('useEffect')
        request({
          url: {where: 'bar'},
        }).then((axiosResponse) => {
          expect(axiosResponse).to.be.an('object')
          expect(get).to.deep.equal(result)
          console.log(axiosResponse)
        }).catch((error) => {
          console.log('error', error)
        })
      }, [])

      const onChangeResult = () => {
        set(setResult)
        expect(get).to.deep.equal(setResult)
      }

      const setResult = {foo: 'foo'}
      return <div onClick={onChangeResult}> {get ? get.foo : ''} </div>
    }

    const wrapper = shallow(<MockComponent />)
    wrapper.update()
    expect(wrapper.html()).to.equal('<div>  </div>')
    await flushPromises
    // 아놔 진짜 리엑트 useEffect 안도네 리엑트를 왜쓰는 거지 ?
    console.log(wrapper.html())
  })
})
