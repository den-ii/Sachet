import React from 'react'
import "./Header.css"


const Header = ({HeaderText}) => {
  return (
         <header className="languageHeader">
          <p className='lang'>{HeaderText}</p>
        </header>
  )
}

export default Header