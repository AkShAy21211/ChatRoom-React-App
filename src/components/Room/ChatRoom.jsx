import React, { forwardRef } from 'react';
import "./ChatRoom.css";

const Room = forwardRef(({setRoom}, ref) => {

  console.log(setRoom);
  console.log(ref);
  return (
    <div className="chat-outer mx-auto w-full max-w-xxl px-8 py-4">
      <label className="block text-center font-bold mb-3">Enter Room Name</label>
      <input ref={ref}  className="block w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" type="text" placeholder="Room Name" />
      <button onClick={()=>setRoom(ref.current.value)} className="block w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50" type="button">Enter Room</button>
    </div>
  );
});

export default Room;
