import {createGlobalState} from 'react-hooks-global-state'
import {SetStateAction} from 'react'

class User {
  id: string | null = null
  name: string | null = null
  email: string | null = null
}

interface UserData {
  id: string
  name: string
  email: string
}

const {setGlobalState, useGlobalState} = createGlobalState(new User())

export const saveUser = (data: UserData) => {
  setGlobalState('name', data.name)
  setGlobalState('id', data.id)
  setGlobalState('email', data.email)
}

export {useGlobalState}
