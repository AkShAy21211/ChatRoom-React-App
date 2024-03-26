import React, { useEffect, useState } from 'react';
import {addDoc, collection,onSnapshot,serverTimestamp,query, where, orderBy} from "firebase/firestore"
import "./Chat.css"
import { auth, db } from '../../config/firebase.config';


function Chat({room}) {

    
    const [message,setMessage] = useState("");
    const [prevMessages,setPrevMessages] = useState([])
    const messageRef = collection(db,'messages');

    useEffect(()=>{
        const queryMessage = query(messageRef,
            where('room','==',room),
            orderBy('createAt'))
     const unsubscribe =   onSnapshot(queryMessage,(snapshot)=>{

            let message = [];
            snapshot.forEach((doc)=>{

                message.push({...doc.data(),id:doc.id});
            });

            setPrevMessages(message);
        });

        return ()=> unsubscribe();
    },[])
    const handleSubmit = async (e)=>{
       try{
        e.preventDefault();
        if(!message.trim()) return;

        await addDoc(messageRef,{
            text:message,
            createAt:serverTimestamp(),
            user:auth.currentUser.displayName,
            time:Date.now(),
            room,
        });

        setMessage("");
        console.log(message);

       }catch(error){

        console.error(error);
       }
    }
  return (
<div className="chat-App flex  flex-col mb-14 justify-end h-screen">

<div className='room-name mb-3'>
<h1>Welcome to {room}</h1><div>
</div>
<div className='messages mt-4'>
  {prevMessages.map((msg, index) => (
    <div key={msg.id} className="message bg-transparent shadow-lg p-3 mb-3" >
      <span className='user text-sm mr-2'>{msg.user} :</span>
      <span className="text-gray-600 text-md font-mediu font-mono">{msg.text}</span>
      <span className="text-xs text-dark ml-2">{new Date(msg.time).toLocaleTimeString()}</span>
    </div>
  ))}
</div>




</div>

  <form className="message-form flex items-center">
  <input
  placeholder="Type your message here"
  className="message-input w-full md:w-80 lg:w-96 xl:w-112 px-4 py-3 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
  onChange={(e) => setMessage(e.target.value)}
  value={message}
/>

    <button
      onClick={handleSubmit}
      type="submit"
      className="send-button px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Send
    </button>
  </form>
</div>


  )
}

export default Chat
