import {auth,provider} from "../../config/firebase.config";
import {signInWithPopup} from "firebase/auth";
import "./Auth.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();
function Auth({setIsAuth}) {
    const signinWithGoogle = async ()=>{
      try{


       const result =  await signInWithPopup(auth,provider);
       cookies.set("auth-tocken",result.user.refreshToken);
       setIsAuth(true)
      console.log(result);
      }catch(error){

        console.error(error);
      }
    }
  return (
<div className="login-outer mx-auto w-full max-w-xxl px-8 py-4">
    <h1 className="text-2xl font-bold font-serif text-center mb-4">Login With Google To Continue</h1>
    <button onClick={signinWithGoogle} className="block w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50">
      Login
    </button>
  </div>
  
  )
}

export default Auth;

