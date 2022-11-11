import { createContext, useState } from "react";
import $ from 'jquery';

export const AuthContext = createContext(),
// Authentication context
AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(false);
  const [authError, setError] = useState({ error: false , msg: null})
  const [wsObject, setWsObject] = useState()

  const initSocket = () => {
    if (!(window.WebSocket)) {
      alert('Your browser does not support WebSocket')
      return
    }
    const token = localStorage.getItem("token")
    let ws = new WebSocket("ws://localhost:7070/v1/initConn?token="+token)
    setWsObject(ws)
    ws.onopen = function() {
      console.log("open")
    }
  
    ws.onmessage = function (event) {
      let res = JSON.parse(event.data)
    }
  
    ws.onclose = function() {
      console.log("close")
    }
  }
  
  // Sign in method
  const signIn = (email, password) => {
    const settings = {
        "url": "http://localhost:7070/v1/signin",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "email": `${email}`,
          "password": `${password}`
        }),
    };
      
    $.ajax(settings).always(function (response) {
        if(response ) {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("id", response.data.id)
            setAuth(true)
            initSocket()
        }
    });
  }
  // Sign out method
  const signOut = () => {
    setAuth(false)
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    wsObject.close()
  }
  

  return (
    <AuthContext.Provider value={{auth, signIn, signOut, authError, wsObject}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
