import React from 'react'
import { useState, useEffect } from 'react'
import "./Nav.css"

const Nav  = ({setCurrentPage, currentPage}) => {
    
    const handleClick = (x) => {
        setCurrentPage(x);
    }
    
  return (
    <div className='nav-container'>

        <button type="button" onClick={() => handleClick(1)}>Top Tracks</button>
        <button type="button" onClick={() => handleClick(2)}>Create Playlist</button>
        <button type="button" onClick={() => handleClick(3)}>Analyze Playlist</button> 


    </div>
  )
}

export default Nav