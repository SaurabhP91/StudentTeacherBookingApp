import "./login.css"
import { getDatabase, ref, push, set, onValue, remove, update } from "firebase/database";

import React, { useEffect, useRef, useState } from 'react'
import { memberListInDB, studentListInDB , teacherListInDB} from './../../index';
import { Link, Navigate } from "react-router-dom";
function Login() {
  const [loginUser,setLoginUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  function fetchData(e){
    e.preventDefault();
    onValue(studentListInDB, function(snapshot){
      let itemsArray = Object.values(snapshot.val());
      console.log(itemsArray);
      alert("work");

    })
  }

  function handleLogin(e) {
      alert("working");
      e.preventDefault();
      //document.addEventListener('DOMContentLoaded', function() {

        let emailvalue = email.value;
        let passvalue = password.value;
        let usertypevalue = userType.value;
        let found = false;
        
        console.log(email,password,userType);
  
        if(email === "" || password === ""){
          alert("Ensure you input a value in all required fields");
        }
        else{
          if(userType === "Teacher")
          {
            onValue(teacherListInDB, function(snapshot)
            {
              let itemsArray = Object.entries(snapshot.val());
              
              for(let i=0;i<itemsArray.length;i++)
              {
                let currentItem = Object.values(itemsArray[i]);
                console.log(currentItem);
                let currentItemID = currentItem[0];
                let currentItemEmail = currentItem[1].email;
                let currentItemUsername = currentItem[1].username;
                let currentItemPass = currentItem[1].password;
                let currentItemType = currentItem[1].userType;
                console.log("Object: "+currentItemUsername+currentItemEmail+currentItemPass);

                if(currentItemEmail == email && currentItemPass == password && currentItemType == userType)
                {
                  console.log("user found");
                  found=true;
                  const serializedItem = JSON.stringify(currentItemUsername+" "+currentItemType);
                  setLoginUser(serializedItem);
                  return (<Navigate to={`/?loginuser=${encodeURIComponent(serializedItem)}`} />);
                }
              }
            })

          }
          else if(userType === "Student")
          {
            onValue(studentListInDB, function(snapshot)
            {
              let itemsArray = Object.entries(snapshot.val());
              
              for(let i=0;i<itemsArray.length;i++)
              {
                let currentItem = Object.values(itemsArray[i]);
                console.log(currentItem);
                let currentItemID = currentItem[0];
                let currentItemEmail = currentItem[1].email;
                let currentItemUsername = currentItem[1].username;
                let currentItemPass = currentItem[1].password;
                let currentItemType = currentItem[1].userType;
                console.log("Object: "+currentItemUsername+currentItemEmail+currentItemPass);

                if(currentItemEmail == email && currentItemPass == password && currentItemType == userType)
                {
                  console.log("user found");
                  found=true;
                  const serializedItem = JSON.stringify(currentItemUsername+" "+currentItemType);
                  setLoginUser(serializedItem);
                  return (<Navigate to={`/?loginuser=${encodeURIComponent(serializedItem)}`} />);
                }
              }
            })
          }
           
        }

    //})
  }

  if(loginUser.length>1){
    return <Navigate to={`/?loginuser=${encodeURIComponent(loginUser)}`} />;

  }
 
 
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Student Teacher Appointment Booking</h3>
          <span className="loginDesc">
            Connect with teachers in a 1 to 1 doubt clearing session
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form id="login-form" onSubmit={handleLogin}>

                <select name="usertype" id="usertype" className="loginInput"
                onChange={(e) => setUserType(e.target.value)}
                defaultValue={""}>
                  <option value="" disabled >-- Select User Type --</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                </select>

                <input placeholder="Email" className="loginInput" 
                id="login-email" onChange={(e) => setEmail(e.target.value)}/>
                <input placeholder="Password" type="password" className="loginInput" 
                id="login-password" onChange={(e) => setPassword(e.target.value)}/>
                <button className="loginButton" type="submit" 
                id="loginBtn">  Log In</button>
                <span className="loginForgot">Forgot Password?</span>
                <Link to='/register' className='loginRegister'>
                  <button className="loginRegisterButton">
                    Create a New Account
                  </button>
                </Link>
               

             

            </form>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
