import React, { useContext, useState } from 'react'
import './main.css'
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import SearchIcon from '@mui/icons-material/Search';
import SearchResults from '../SearchResults/SearchResults';
import { appointmentListInDB } from './../../index';

function Main() {
  const stuRef = useRef(null);
  const [date,setDate] = useState(new Date());
  const [time,setTime] = useState('12:00');
  //const [parentSearchTerm, setParentSearchTerm] = useState("");
  //const searchinput = document.getElementById("search-submit")
  //const searchTerm = searchinput.value;
  const handleClick = () =>{
    stuRef.current.style.backgroundColor = 'lightblue';
  }

  const dateChange = (date) => {
    setDate(date);
  };

  const timeChange = (time) => {
    setTime(time);
  }
  /*const handleParentSearch = (searchTerm) => {
    setParentSearchTerm(searchTerm);
  } */
 /* const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted appointment request");
  
        if(date === "" || time === "" || searchTerm === ""){
          alert("Ensure you input a value in all required fields");
        }
        else{
          let memberArray = {searchTerm,date,time};
  
          
        
          alert("The teacher is "+searchTerm);
         
        }
      
  }*/

 


  return (
    <div id='main-container'>
      <span className='about-us-container'>
        <h2>Online Booking</h2>
        <p>
        Appointment can be fixed via online mode.
        No need to go physical for booking. 
        At your place, you can book your appointment with help of the internet. 
        You can reschedule your booking at your convenience.
        </p>
      </span>
      <span className='about-us-container'>
        <h2>Alerts & Notification</h2>
        <p>
        All online appointment-related alerts and notifications can be sent via users' contact details.
        All related notifications can also be communicated reminders can also be sent via email or contact details.
        </p>
      </span>
      <span className='about-us-container'>
        <h2>Find The Perfect Teacher For You</h2>
        <p>
          Search for teachers in a specific domain and  subject speciality according to your needs.

        </p>
      </span>
      <span id='student-section' ref={stuRef}>
        <h1>Student Section</h1>
        <span id='student-row'>
          <span id='student-left'>
            <p>Book a day for your appointment</p>
            <Calendar value={date} onChange={dateChange} id='student-calendar'></Calendar>
            <p>Selected date: {date.toLocaleDateString()}</p>
            <TimePicker onChange={timeChange} value={time} id='student-time' label='Controlled picker'></TimePicker>
            <p>Selected time: {time}</p>
          </span>
          <span id='student-middle'>
            <p>Search for a Teacher</p>
          
          <SearchResults />
         
          </span>
          <span id='student-right'>
            <button id='appointment-submit'>Check for Appointment</button>
          </span>
        </span>
     
       
      </span>
      <span id='teacher-section'>
        <h1>Teacher Section</h1>
        <Link to="/login" class='logreg-link'>
          <button class='logreg-btn' id='teacher-login'>Teacher Login</button>
        </Link>
        <Link to="/register" class='logreg-link'>
        <button class='logreg-btn' id='teacher-register'>Teacher Register</button>
        </Link>
      </span>

    </div>
  )
}

export default Main
