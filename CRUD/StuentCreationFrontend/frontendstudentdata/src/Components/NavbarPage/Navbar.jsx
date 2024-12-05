import React from 'react'
import './Navbar.css'
import logo from './Asset/StudentDetails.png'
import { Link } from 'react-router-dom'

export default function Navbar() {

    function gofunction(){
        // window.scrollTo(0,0);
    
      }
    return (
        <div className='navigation-container'>
            
            <div className='logo-div' onClick={()=>gofunction()} >
            <img src={logo} alt="logo" />
            </div>
            <ul className='ul-menu-div'>
                <li><a><Link to={"/"}>Home</Link></a></li>
                <li><a><Link to={"/List"}>Student List</Link></a></li>
                {/* <li><a href='#SUpdate'>Update</a></li> */}
            </ul>
        </div>
    )
}
