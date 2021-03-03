import AuthStore from './auth'
import React, {createContext, useContext} from 'react'
import Model from '../models/index'

const context = createContext({
  AuthStore: new AuthStore()
})
const useStore = () => useContext(context)
export default useStore
