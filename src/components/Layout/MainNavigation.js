import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';
import { useHistory } from 'react-router-dom';


const MainNavigation = () => {
  const history = useHistory();
   const authCtx = useContext(AuthContext);
  
  

  const logoutHandler = () => {
     authCtx.logoutStateHandler();
    
    localStorage.setItem('login',false);
    history.replace('/');

    
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Home</div>
      </Link>
      <nav>
        <ul>
        
          
          {authCtx.isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
