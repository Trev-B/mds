import React from 'react'
import { useState, useEffect } from 'react'
import "./Nav.css"
// import AppBar from '@material-ui/core/AppBar';
// import Container from '@material-ui/core/Container'
// import AcUnitOutlinedIcon from '@material-ui/icons/AcUnitOutlined';

const Nav  = ({setCurrentPage, currentPage, logout}) => {
    
    const handleClick = (x) => {
        setCurrentPage(x);
    }
    
  return (
    <div className='nav-container'>
         
          <button type="button" onClick={() => handleClick(1)}>Home</button>
          <button type="button" onClick={() => handleClick(2)}>Create Playlist</button>
          <button type="button" onClick={() => handleClick(3)}>Analyze Playlist</button> 

          <button onClick={logout}>Logout</button>

    </div>
  )
}

export default Nav