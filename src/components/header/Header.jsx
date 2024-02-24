import React, { useEffect, useRef } from 'react'
import './header.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { ref } from 'firebase/database';
function Header() {
    const loginRef = useRef(null);
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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serializedItem = searchParams.get('loginuser');
  
  // Parse the serialized data back into an object
  const currentItem = JSON.parse(decodeURIComponent(serializedItem));
  
  
  useEffect(() => {
    const queryString = window.location.search;
    if(queryString){
           // Split the text into an array of words
    const wordsArray = currentItem.split(" ");

    // Filter out the word to remove
      const filteredWordsArray = wordsArray.filter(word => word !== "Teacher" && word !== "Student");
  
    // Join the filtered array back into a single string
      const loginUsername = filteredWordsArray.join(" ");
        loginRef.current.innerHTML = "";
        loginRef.current.innerHTML = "Logout "+loginUsername;
      
     
    }
  },[]);
 
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
                <button className="btn btn-secondary" id="login" ref={loginRef}>Login</button>
            </Link>

            <Link to="/register" className="registerbtn" id="registerbtn" >
                <button className="btn btn-secondary" id="register">Register</button>
            </Link>

         </div>
  )
}

export default Header
