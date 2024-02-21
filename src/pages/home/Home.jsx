import React from 'react'
import "./home.css"
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import Main from '../../components/main/Main'

export default function Home() {
  function sidebarToggle(){
    const sidebaricon = document.getElementById("menu-icon-container");
    const sidebar = document.getElementById("sidebar-container");
    sidebar.style.display = "block";

  }
  return (
    <div>
        <Header/>
        <Sidebar/>
        <Main/>
    </div>
  )
}





