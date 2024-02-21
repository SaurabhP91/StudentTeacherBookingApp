import React from 'react'
import './header.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
function Header() {
  const sidebarOpen = () =>{
    const sidebaricon = document.getElementById("menu-icon-container");
    const closeIcon = document.getElementById("close-icon-container");
    const sidebar = document.getElementById("sidebar-container");
    const mainPage = document.getElementById("main-container");
    const header = document.getElementById("header-container");


    sidebar.style.display = "block";
    header.style.marginLeft = "14%";
    header.style.width = "86%";

    mainPage.style.marginLeft = "14%";
    closeIcon.style.display = "block";
    sidebaricon.style.display = "none";


  }
 
  return (
        <div id="header-container">
            <span id='menu-icon-container' onClick={sidebarOpen}>
                <MenuIcon />

            </span>
       
        
            <a href="#" className="logo">
            <span className="logoname">Book a Class</span>
                 <ion-icon name="barbell-sharp" aria-hidden="true"></ion-icon>
             </a>

            <nav className="navbar">
                <ul>
                    <a href="#home1" className="navbar-link active">Home</a>

                </ul>

                <ul>
                    <a href="#about" className="navbar-link active">About Us</a>
                
                </ul>

                <ul>
                    <a href="#plans" className="navbar-link active">Plans</a>
                </ul>

                <ul>
                    <a href="#contact" className="navbar-link active" id="contact">Contact Us</a>
                </ul>

            </nav>
            <Link to="/login" className="loginbtn" id="loginbtn">
                <button className="btn btn-secondary" id="login">Login</button>
            </Link>

            <Link to="/register" className="registerbtn" id="registerbtn" >
                <button className="btn btn-secondary" id="register">Register</button>
            </Link>

         </div>
  )
}

export default Header
