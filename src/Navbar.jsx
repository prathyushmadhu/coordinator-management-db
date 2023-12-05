
import React, { useState } from 'react' 
import '/Navbar.css'
import logo from '../assets/logo.png'
import hand from '/assets/vol.png'


const Navbar=()=>{
 return(
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={hand} alt=''/>
                <p>volunteer management</p>
            </div>
            <div className='nav-menu'>
                <button  ><Link to="">view</Link></button>
            </div>
            <div className='nav-login-cart'>
                <button>save</button>
            </div>
        </div>
    )
}
export default Navbar