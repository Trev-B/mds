import React from 'react'
import { useState, useEffect } from 'react'
import "./Nav.css"

const Nav  = ({setCurrentPage, currentPage, logout}) => {
    
    const handleClick = (x) => {
        setCurrentPage(x);
    }
    
  return (
    <div className='nav-container'>
        <div className='nav-header'>
          <h6>MDS</h6>
          <hr></hr>
        </div>

        <button type="button" onClick={() => handleClick(1)}>Home</button>
        <button type="button" onClick={() => handleClick(2)}>Create Playlist</button>
        <button type="button" onClick={() => handleClick(3)}>Analyze Playlist</button> 

        <button onClick={logout}>Logout</button>

    </div>
  )
}

export default Nav