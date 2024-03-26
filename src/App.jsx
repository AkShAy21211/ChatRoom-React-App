import React, { useState, useRef, useEffect } from "react";
import Auth from "./components/Auth/Auth";
import Cookies from "universal-cookie";
import Room from "./components/Room/ChatRoom";
import Chat from "./components/chats/Chat";
import {signOut} from "firebase/auth"
import { auth } from "./config/firebase.config";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-tocken"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  const signOutUser = async ()=>{
    await signOut(auth);
    cookies.remove("auth-tocken");
    setIsAuth(false);
    setRoom(null);

  }


  if (!isAuth) {
    return <Auth setIsAuth={setIsAuth} />;
  }
  return (
    <>
  <div className="sign-out absolute top-0 right-0 mt-4 mr-4">
    <button className="bg-red-500 p-2 rounded-lg text-white" onClick={signOutUser}>Log Out</button>
  </div>
  {room ? (
    <Chat room={room}/>
  ) : (
    <Room setRoom={setRoom} ref={roomInputRef} />
  )}

</>

  );
}

export default App;
