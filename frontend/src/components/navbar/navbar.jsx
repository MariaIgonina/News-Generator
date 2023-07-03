import React from 'react'
import './navbar.css'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar({setSearchIsOpen, searchIsOpen}) {
  
  const navigate = useNavigate()

  return (
    <div className='navbar'>
      <img 
        src={logo} 
        alt="Logo"
        className='logo-navbar'/>
      
      <div className='icons'>
        <HomeIcon
          className='nav-icon'
          onClick={() => navigate('/')} />

        <ManageSearchIcon 
          className='nav-icon'
          onClick={() => setSearchIsOpen(!searchIsOpen)} /> 

        <AccountCircleIcon
          className='nav-icon' 
          onClick={() => navigate('/login')} /> 
      </div>
    </div>
  )
}
