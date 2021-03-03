import AuthStore from './auth'
import React, {createContext, useContext} from 'react'

const context = createContext({
  AuthStore: new AuthStore()
})
const useStore = () => useContext(context)
export default useStore
