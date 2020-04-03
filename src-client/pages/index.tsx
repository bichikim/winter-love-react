import React from 'react'
import Example from 'components/Example'

export const index: React.FC = () => {
  return pug`
    div index page
      Example
      div BASE_URL #{process.env.BASE_URL}
  `
}

export default index
