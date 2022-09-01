import React, { useState} from 'react';

let logoutTimer;
//context to handle loggin info
const AuthContext = React.createContext({
  isLoggedIn: false, 
  loginStateHandler:()=>{},
  logoutStateHandler:()=>{}
});


export const AuthContextProvider = (props) => {
  const state=localStorage.getItem('login');
  console.log(state);
  console.log(localStorage.getItem('admin'));
  // const adminState=localStorage.getItem('admin');

  const [isLoggedIn,setIsLogin] =useState(state);
  // const [isAdmin,setAdmin]=useState(adminState);
 
  
  const loginStateHandler = () =>{
    setIsLogin(true);
    localStorage.setItem('login',true);
  }

  const logoutStateHandler = () =>{
    setIsLogin(false);
    localStorage.setItem('login',false);
    localStorage.setItem('admin',false);
    console.log(isLoggedIn);
  }
  
  const contextValue = {
    isLoggedIn: isLoggedIn,
    loginStateHandler:loginStateHandler,
    logoutStateHandler:logoutStateHandler

  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
