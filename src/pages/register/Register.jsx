
import React, { useEffect, useRef, useState } from 'react'
import { memberListInDB } from './../../index';
import { studentListInDB } from './../../index';
import { teacherListInDB } from './../../index';
import { getDatabase, ref, push, set, onValue, remove, update } from "firebase/database";

import './register.css'
import { Link } from 'react-router-dom';
function Register() {

  function handleRegister(e) {
    alert("working");
    e.preventDefault();
    //document.addEventListener('DOMContentLoaded', function() {

      let emailvalue = email.value;
      let passvalue = password.value;
      let usertypevalue = userType.value;
      let uservalue = username.value;

      let found = false;
      
      console.log(userType,username,email,password);

      if(email === "" || password === "" || username === "" || userType === ""){
        alert("Ensure you input a value in all required fields");
      }
      else{
        let memberArray = {userType,email,username,password};

        
      
        alert("The username is "+username);
        if(userType === "Teacher")
        {
          push(teacherListInDB,memberArray);
        }
        else{
          push(studentListInDB,memberArray);
        }
      }
    }

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
    return (
        <div className="register">
          <div className="registerWrapper">
            <div className="registerLeft">
              <h3 className="registerLogo">Student Teacher Appointment Booking</h3>
              <span className="registerDesc">
                Connect with teachers in a 1 to 1 doubt clearing session
              </span>
            </div>
          <div className="registerRight">
          <div className="registerBox">
            <form id="register-form" onSubmit={handleRegister}>

            <select name="usertype" id="usertype" className="loginInput"
                onChange={(e) => setUserType(e.target.value)}
                defaultValue={"-- Select User Type --"}>
                  <option disabled defaultValue={"Select User Type"}>-- Select User Type --</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                </select>

            <input placeholder="Username" className="registerInput" 
            id='register-username'onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="Email" className="registerInput" 
            id="register-email" onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password" type="password" className="registerInput" 
            id="register-password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="registerButton" type='submit'>Sign Up</button>
            <Link to='/login' className='loginRegister'>
             <button className="loginRegisterButton">
              Log into Account
              </button>
            </Link>
            

            </form>
          </div>
        </div>
          </div>
        </div>
      )
}

export default Register
