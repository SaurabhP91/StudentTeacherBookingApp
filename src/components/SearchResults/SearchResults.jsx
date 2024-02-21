import React, { createContext, useContext } from 'react'
import './SearchResults.css'

import { teacherListInDB } from './../../index';
import { useRef, useState } from 'react';
import { getDatabase, ref, push, set, onValue, remove, update } from "firebase/database";
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Main from '../main/Main';

function SearchResults() {
    const [searchTerm, setSearch] = useState("");
    const searchContext = createContext();
    
    const [results,setResults] = useState([]);
    //const [searchSubmit, setSearchSubmit] = useState("");
    const resultRef = useRef(null);
    const handleClick = (username) => {
        alert("selected: "+username);
    }
    useEffect(() => {
        fetchData();
    },[]);
    const handleSearch = (e) => {
        
        setSearch(e.target.value);
        //console.log(searchTerm);

       /*if(searchTerm.length > 0){
            fetchMatchingTerm(searchTerm);
        }*/
      }

    
    /*function fetchMatchingTerm(searchTerm) {
        onValue(teacherListInDB, function(snapshot)
        {
            let itemsArray = Object.entries(snapshot.val());
            const filteredItems = itemsArray.filter((item) => {
                 item[1].username.includes(searchTerm);
            })
            resultRef.current.innerHTML = "";
            console.log("filtered items"+ filteredItems[1].username);
            for(let i=0;i<filteredItems.length;i++)
          {
            let currentItem = Object.values(filteredItems[i]);
            //console.log(currentItem);
            let currentItemID = currentItem[0];
            let currentItemEmail = currentItem[1].email;
            let currentItemUsername = currentItem[1].username;
            let currentItemPass = currentItem[1].password;
            let currentItemType = currentItem[1].userType;
            console.log("Object: "+currentItemUsername);

           // resultRef.current.appendChild(
             //   <div onClick={handleClick}>{currentItemUsername}</div>
            //)
            
          }
        })
    }*/

    function fetchData() {
        onValue(teacherListInDB, function(snapshot)
        {
          let itemsArray = Object.entries(snapshot.val());
          resultRef.current.innerHTML ="";
          for(let i=0;i<itemsArray.length;i++)
          {
            let currentItem = Object.values(itemsArray[i]);
            console.log(currentItem);
            let currentItemID = currentItem[0];
            let currentItemEmail = currentItem[1].email;
            let currentItemUsername = currentItem[1].username;
            let currentItemPass = currentItem[1].password;
            let currentItemType = currentItem[1].userType;
            console.log("Object: "+currentItemUsername);

            /*resultRef.body.appendChild(
                React.createElement('div',{ onClick:handleClick}, currentItemUsername)
            )
            const filteredResults = itemsArray.filter(([_, item]) =>
            item.username.includes(searchTerm)
            );*/
            
            
          }
          setResults(itemsArray);
        })
    }
  return (
    <div id='search-results-container'  >
          <span id="searchbar">
              <SearchIcon className="searchicon"/>
              <input type='text' placeholder="Search..." 
              value={searchTerm} onChange={handleSearch} className="searchinput"/>
              <button id='search-submit'>Select</button>
            </span>
      
        <div id='results-list' ref={resultRef}>
            {results.map(([id, item]) => (
                    <div key={id} onClick={() => setSearch(item.username)}>
                        {item.username}
                    </div>
                ))}
        </div>
        <p>Selected Teacher: {searchTerm}</p>


       {/* <searchContext.Provider value={searchTerm}>
            <Main searchTerm={searchTerm}/>
        </searchContext.Provider>*/}
    </div> 
  )
}

export default SearchResults
