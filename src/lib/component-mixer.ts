import {FunctionComponent, FunctionComponentElement, PropsWithChildren} from 'react'

function componentMixer<P, C, D>(
  name: string,
  render: (data: D) => FunctionComponent<P>,
): FunctionComponent<P>

function componentMixer<P, C, D>(
  name: string,
  setUp: (props?: PropsWithChildren<P>, context?: C) => D,
  render: (data: D) => FunctionComponentElement<P>,
): FunctionComponent<P>

function componentMixer<P, C, D>(
  name: string,
  setUp: Function,
  render?: (data: D) => FunctionComponentElement<P>,
): FunctionComponent<P> {
  let functionComponent: FunctionComponent<P>

  if(render) {
    functionComponent = (props: PropsWithChildren<P>, context?: any) =>
      render(setUp(props, context))
  } else {
    functionComponent = (props: PropsWithChildren<P>, context?: any) => setUp()
  }

  functionComponent.displayName = name

  return functionComponent
}

export default componentMixer
