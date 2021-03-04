import AuthStore from './auth'
import UserStore from './user'
import React, {createContext, useContext} from 'react'

const context = createContext({
  AuthStore,UserStore
})
const useStore = () => useContext(context)
export default useStore
