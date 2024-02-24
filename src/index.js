import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue, remove, update } from "firebase/database";
import {useState,useContext} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));

const appSettings = {
  databaseURL: "https://studentteacherbookingapp-f22e2-default-rtdb.firebaseio.com/"

}

const app = initializeApp(appSettings);
export const database = getDatabase(app);
const databaseContext = createContext();

export const memberListInDB = ref(database, "memberList");
export const studentListInDB = ref(database, "studentList");
export const teacherListInDB = ref(database, "teacherList");
export const appointmentListInDB = ref(database, "appointmentList");

export const DatabaseProvider = ({children}) => {
  const studentListInDB = ref(database, "studentList");
  const teacherListInDB = ref(database, "teacherList");
  const appointmentListInDB = ref(database, "appointmentList");

  return(
    <databaseContext.Provider value={{studentListInDB,teacherListInDB,appointmentListInDB,database}}>
      {children}
    </databaseContext.Provider>
  )
}

root.render(
  <DatabaseProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DatabaseProvider>
 
);


