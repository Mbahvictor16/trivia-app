import React from 'react'
import BulbSvg from "../assets/light-bulb-svgrepo-com.svg"

const Header = () => {
    const sizes = {
        width: 25,
        height: 50
    }
  return (
    <header>
        <span>
          <img src={BulbSvg}  width={sizes.width} height={sizes.height}/>
        </span>
        <span>Brain Trivia</span>
    </header>
  )
}

export default Header