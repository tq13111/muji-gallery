import React from 'react'
import useStore from '../stores'
import {observer} from 'mobx-react'
import styled from 'styled-components'

const Tips = styled.div`
  background: rgba(252, 0, 0, 0.5);
  padding: 10px;
  margin: 30px 0;
  color: white;
  border-radius: 4px;
  font-weight: bold;
`

const Component = observer(({children}) => {
  const {UserStore} = useStore()
  return (
    <>{
      UserStore.currentUser ? null : <Tips>{children}</Tips>
    }</>
  )
})
export default Component
