import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import Admin from './components/Auth/Admin';

function App() {
  const authCtx = useContext(AuthContext);
  let state ;
  if(localStorage.getItem('admin')==="false"){
    state=false;
  }
  else{
    state=true;
  }
  

  return (
    <Layout>
      <Switch>
        <Route path='/admin' >
         {state &&<Admin/>}
         {!state && <Redirect to='/' />} 
        </Route>
        
          <Route path='/' exact>
          {!authCtx.isLoggedIn&&<AuthPage />}
          {authCtx.isLoggedIn && <UserProfile />}
          </Route>
      
        <Route path='/profile'>
          
          {!authCtx.isLoggedIn && <Redirect to='/' />}
          {console.log("+")}
          {authCtx.isLoggedIn && <UserProfile />}
          {console.log("-")}
        </Route>
        {console.log("+")}
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
