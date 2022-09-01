import React, { useState} from 'react';

//context to handle loggin info
const AuthContext = React.createContext({
  isLoggedIn: false, 
  loginStateHandler:()=>{},
  logoutStateHandler:()=>{}
});


export const AuthContextProvider = (props) => {
  let state;
  if(localStorage.getItem('login')==="false"){
    state=false;
  }
  else{
    state=true;
  }
  console.log(state);
  console.log("local1",typeof (localStorage.getItem('login')));
  
  

  const [isLoggedIn,setIsLogin] =useState(state);
  
 
  
  const loginStateHandler = () =>{
    setIsLogin(true);
    localStorage.setItem('login',JSON.stringify(true));
  }

  const logoutStateHandler = () =>{
    setIsLogin(false);
    localStorage.setItem('login',JSON.parse(false));
    localStorage.setItem('admin',JSON.parse(false));
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
