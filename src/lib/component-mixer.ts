import {PropsWithChildren, ReactElement, FunctionComponentElement} from 'react'

export const componentMixer = <
  P = any,
  C = any,
  D = any,
  >(
  setUp: (props: PropsWithChildren<P>,
          context?: C,
  ) => D,
  render: (data: D) => FunctionComponentElement<P>
) => {
  return (props: PropsWithChildren<P>) => render(setUp(props))
}

export default componentMixer
