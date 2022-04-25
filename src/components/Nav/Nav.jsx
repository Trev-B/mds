import React from 'react'
import { useState, useEffect } from 'react'
import "./Nav.css"
// import AppBar from '@material-ui/core/AppBar';
// import Container from '@material-ui/core/Container'
// import AcUnitOutlinedIcon from '@material-ui/icons/AcUnitOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import LogoutIcon from '@material-ui/icons/ExitToApp';

const Nav  = ({setCurrentPage, currentPage, logout}) => {
    
    const handleClick = (x) => {
        setCurrentPage(x);
    }
    
  return (
    <div className='nav-container'>
         
          <button type="button" onClick={() => handleClick(1)}><HomeIcon/> Home</button>
          <button type="button" onClick={() => handleClick(2)}><AddBoxIcon/> Create Playlist</button>
          <button type="button" onClick={() => handleClick(3)}><BarChartIcon/> Analyze Playlist</button> 

          <button onClick={logout}><LogoutIcon/> Logout</button>

    </div>
  )
}

export default Nav