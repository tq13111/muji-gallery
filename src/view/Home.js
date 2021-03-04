import React from 'react'
import useStore from '../stores'
import Uploader from '../components/Uploader'

function Home() {
  const {UserStore} = useStore()
  return (
    <>
      <h1>{UserStore.currentUser ?
        <>
          Hello {UserStore.currentUser.attributes.username}
        </> : <>用户未登录</>
      }</h1>

      <Uploader/>
    </>
  )
}

export default Home
