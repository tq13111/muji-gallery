import AuthStore from './auth'
import UserStore from './user'
import ImageStore from './image'
import HistoryStore from './history'
import React, {createContext, useContext} from 'react'

const context = createContext({
  AuthStore, UserStore, ImageStore, HistoryStore
})
window.x = {ImageStore, UserStore, HistoryStore}
const useStore = () => useContext(context)
export default useStore
