import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/'>e-commers</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/cart'>cart</Link></li>
          <li></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header