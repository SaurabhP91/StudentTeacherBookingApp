import React, { useContext, useEffect, useState } from 'react'
import './main.css'
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import SearchIcon from '@mui/icons-material/Search';
import SearchResults from '../SearchResults/SearchResults';
import { appointmentListInDB } from './../../index';
import { onValue, push, set } from 'firebase/database';
import { ref as sRef } from 'firebase/database';
import { remove } from 'firebase/database';
import { database } from './../../index';

function Main() {
  const stuRef = useRef(null);
  const teachRef = useRef(null);
  const [date,setDate] = useState(new Date());
  const [time,setTime] = useState('12:00');
  const [appointments,setAppointments] = useState([]);
  const [parentSearchTerm, setParentSearchTerm] = useState("");
  let loginUsername = "";
  //const searchinput = document.getElementById("search-submit")
  //const searchTerm = searchinput.value;
  const appointmentTableRef = useRef(null);

   // State to manage the visibility of message bodies
   const [messageVisibility, setMessageVisibility] = useState({});

   // Function to handle opening a message
   const handleMsgOpen = (studentName) => {
     setMessageVisibility((prevState) => ({
       ...prevState,
       [studentName]: true, // Set the visibility of the message body to true
     }));
    };

//Start of url navigation code
 /* const queryString = window.location.search;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serializedItem = searchParams.get('loginuser');
    
    // Parse the serialized data back into an object
    const currentItem = JSON.parse(decodeURIComponent(serializedItem));
  if(queryString.length > 3){
    

    // Split the text into an array of words
    const wordsArray = currentItem.split(" ");
  
    // Filter out the word to remove
    const filteredWordsArray = wordsArray.filter(word => word !== "Teacher" && word !== "Student");
  
    // Join the filtered array back into a single string
    const loginUsername = filteredWordsArray.join(" ");
  }
 
  
  useEffect(() => {
     queryString = window.location.search;
    if(queryString.length>3){
      if(currentItem.includes("Teacher"))
      {
        stuRef.current.style.display = 'none';
        teachRef.current.style.display = 'block';

      }
    }
  },[]);*/

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serializedItem = searchParams.get('loginuser');
  
  // Parse the serialized data back into an object
  const currentUser = JSON.parse(decodeURIComponent(serializedItem));
  
  
  useEffect(() => {
    const queryString = window.location.search;
    if(queryString){
           // Split the text into an array of words
      const wordsArray = currentUser.split(" ");

      // Filter out the word to remove
      const filteredWordsArray = wordsArray.filter(word => word !== "Teacher" && word !== "Student");
  
      // Join the filtered array back into a single string
      loginUsername = filteredWordsArray.join(" ");
      if(currentUser.includes("Teacher"))
      {
        stuRef.current.style.display = 'none';
        teachRef.current.style.display = 'flex';

      }
      else if(currentUser.includes("Student"))
      {
        stuRef.current.style.display = 'flex';
        teachRef.current.style.display = 'none';

      }
      fetchAppointments(loginUsername);
     
    }
  },[]);

  const handleClick = () =>{
    stuRef.current.style.backgroundColor = 'lightblue';
  }

  const dateChange = (date) => {
    setDate(date);
  };

  const timeChange = (time) => {
    setTime(time);
  }
  const handleParentSearch = (searchTerm) => {
    setParentSearchTerm(searchTerm);
  } 
 const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitting appointment request");
  
        if(date === "" || time === "" || parentSearchTerm === ""){
          alert("Ensure you input a value in all required fields");
        }
        else{
          const dateOnly = date.toDateString();
          const teacher = parentSearchTerm;
          let memberArray = {dateOnly,time,teacher};
          push(appointmentListInDB,memberArray);
          alert("The teacher is "+memberArray.teacher+" "+memberArray.dateOnly+" "+memberArray.time);
         
        }
      
  }

  function fetchAppointments(loginUsername) {
    let filteredResults = [];
    onValue(appointmentListInDB, function(snapshot)
    {
      
      let itemsArray = Object.entries(snapshot.val());
      console.log("itemsarray: "+itemsArray);
      //resultRef.current.innerHTML ="";
      for(let i=0;i<itemsArray.length;i++)
      {
        let currentItem = Object.values(itemsArray[i]);
        console.log(currentItem);
        let currentItemID = currentItem[0];
        let currentItemTeacher = currentItem[1].teacher;
        
        console.log("Object: "+currentItemTeacher);
        /*resultRef.body.appendChild(
            React.createElement('div',{ onClick:handleClick}, currentItemUsername)
        )*/
        filteredResults = itemsArray.filter(([_, item]) =>
          item.teacher.includes(loginUsername)
        );
        
        
      }
      setAppointments(filteredResults);
    })
  }

  function removeAppointment(id){
    alert("removing: "+id);
    const appointmentPath = "appointmentList/"+id;
    const appointmentRef = sRef(database,appointmentPath);
    set(sRef(appointmentRef,null))
    .then(() => {
      console.log("Item removed successfully");
    })
    .catch((error) => {
      console.error("Error removing item");
    });
  }
  

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
            <p>Selected Date: {date.toLocaleDateString()}</p>
            <TimePicker onChange={timeChange} value={time} id='student-time' label='Controlled picker'></TimePicker>
            <p>Selected Time: {time}</p>
          </span>
          <span id='student-middle'>
            <p>Search for a Teacher</p>
          
          <SearchResults changeParent = {handleParentSearch} />
         
          </span>
          <span id='student-right'>
            <button id='appointment-submit' onClick={handleSubmit}>Check for Appointment</button>
          </span>
        </span>
     
       
      </span>
      <span id='teacher-section' ref={teachRef}>
        <h1>Teacher Section</h1>
        <span id='teacher-row'>
          <span id='teacher-left'>
            <p>View all Appointments</p>
            <button onClick={() => window.location.reload()}>refresh</button>
            <table id='appointments-table'>
              <thead>
                <th>Date</th>
                <th>Time</th>
                <th>Teacher</th>
              </thead>
              

              <tbody>
              {appointments.map(([id, item]) => (
                    <tr key={id}>
                        <td>{item.dateOnly}</td>
                        <td>{item.time}</td>
                        <td>{item.teacher}</td>
                        <td><button className='accept-btn'>Accept</button></td>
                        <td><button className='cancel-btn' onClick={() => removeAppointment(id)}>Cancel</button></td>

                    </tr>
                ))}
              </tbody>
            </table>
          </span>


          <span id='teacher-right'>
            <p>View Messages</p>
            <button onClick={() => window.location.reload()}>refresh</button>
            <div id='message-list'>
              <span className='message'>
                <span className='message-header'>
                Message from Student: Saurabh Patra
                 <button className='msg-open' onClick={() => handleMsgOpen('Saurabh Patra')}>Open</button>
                </span>
                <span className='message-body'  style={{ display: messageVisibility['Saurabh Patra'] ? 'block' : 'none' }}>
                  Hello I would like to clear my doubts regarding 
                  convoluted neural networks, do you have experience working with CNN in any projects?
                </span>
              </span>
              <span className='message'>
                <span className='message-header'>
                  Message from Student: Rahul Sharma
                  <button className='msg-open' onClick={() => handleMsgOpen('Rahul Sharma')}>Open</button>
                </span>
                <span className='message-body' style={{ display: messageVisibility['Rahul Sharma'] ? 'block' : 'none' }}>
                  Respected Ma'am, I would like to follow up with my previous meeting with you
                  for checking answers to the probability questions.
                  When would you be available?
                </span>
              </span>
              <span className='message'>
                <span className='message-header'>
                 Message from Student: Ishika Gupta
                 <button className='msg-open' onClick={() => handleMsgOpen('Ishika Gupta')}>Open</button>
                 </span>
                 <span className='message-body'  style={{ display: messageVisibility['Ishika Gupta'] ? 'block' : 'none' }}>
                  Hello Ma'am i would like to discuss about the functionality
                  of my internship project and execution. The projects topic is :
                  Lung Cancer Detection System
                 </span>
              </span>
               
            </div>
          </span>
        </span>
      </span>

    </div>
  )
}

export default Main
