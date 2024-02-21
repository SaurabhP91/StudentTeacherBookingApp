import React, { useRef } from 'react'
import './sidebar.css'
import Viewapp from '../viewAppointment/Viewapp';
import CloseIcon from '@mui/icons-material/Close';
const Sidebar = () => {
    const childRef = useRef(null);
    <Viewapp ref={childRef}/>
    
  const handleClickView = () => {
    childRef.current.handleClick();
   }

   const sidebarClose = () => {
    const sidebaricon = document.getElementById("menu-icon-container");
    const closeIcon = document.getElementById("close-icon-container");
    const sidebar = document.getElementById("sidebar-container");
    const mainPage = document.getElementById("main-container");
    const header = document.getElementById("header-container");

    sidebar.style.display = "none";
    header.style.marginLeft = "0%";
    header.style.width = "100%";

    mainPage.style.marginLeft = "0%";
    closeIcon.style.display = "none";
    sidebaricon.style.display = "block";
  }
  return (
    
    <div id='sidebar-container'>
             <span id='close-icon-container' onClick={sidebarClose}>
                <CloseIcon style={{color:"black"}}/>

            </span>
            <span id='teacher-features-container'>
                <span>Teacher Features</span>
                <ul id='teacher-features'>
                    <li class="sidebar-link" id="memberlist"><a href="#" onClick={handleClickView}>View All Appointments</a></li>
                </ul>
            </span>
                <ul id="admin-operations">
                    <li class="sidebar-link" id="memberlist"><a href="#">Member List</a></li>
                    <li class="sidebar-link"><a href="#">Plans</a></li>
                    <li class="sidebar-link"><a href="#" id="contact">Contact Us</a></li>
                </ul>
            <br/>
            <span>Student features</span>
            <ul id="member-operations">
                <li class="sidebar-link" id="view-receipts"><a href="#">View all Appointments</a></li>
                <li class="sidebar-link" id="view-receipts"><a href="#">Make an Appointment</a></li>
                <li class="sidebar-link" id="view-notif"><a href="#">Manage appointments</a></li>
            </ul>
        
    </div>
  )
}

export default Sidebar
