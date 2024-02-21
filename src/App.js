import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Sidebar from './components/sidebar/Sidebar';
import Viewapp from './components/viewAppointment/Viewapp';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {useState,createContext, useContext} from "react-dom/client"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {



  const viewAppointments = () => {
    let appointmentPage = document.getElementById("appointment-page");
    appointmentPage.style.display = 'block';
}
  return(
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>

        <Route exact path='/login' element={<Login/>}/>

        <Route exact path='/register' element={<Register/>}/>


      </Routes>
    </Router>
    
  )
   
      
}

export default App;
