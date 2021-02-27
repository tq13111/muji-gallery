import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <div>
      <nav>
        <Link to='/'>home</Link>
        <Link to='/history'>History</Link>
        <Link to='/about'>About</Link>
      </nav>
    </div>
  )
}

export default Header
