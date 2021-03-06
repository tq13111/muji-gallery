import AuthStore from './auth'
import UserStore from './user'
import ImageStore from './image'
import React, {createContext, useContext} from 'react'

const context = createContext({
  AuthStore, UserStore, ImageStore
})
window.x = {ImageStore, UserStore}
const useStore = () => useContext(context)
export default useStore
