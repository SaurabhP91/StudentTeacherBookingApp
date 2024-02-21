import React, { forwardRef, useImperativeHandle, useRef } from 'react'

const Viewapp = forwardRef((props,ref) => {
  const viewAppRef = useRef(null);

  useImperativeHandle(ref,() => ({
    handleClick: () => {
      alert("working");
    },
    viewAppRef,

  }));
  return (
    <div id='view-app-container' ref={viewAppRef}>
      <table>
         <thead>
            <tr>
                <th>S.No.</th>
                <th>Student Name</th>
                <th>Email</th>
                <th>Date & Time</th>
                <th><button class='approvebtn'>Approve</button></th>
            </tr>
         </thead>
        </table>
    </div>
  )

}) 
 

export default Viewapp
