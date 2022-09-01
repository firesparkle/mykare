import { useEffect, useState } from 'react';
import classes from './Admin.module.css';
import UserItem from './UserItem';

const Admin = () => {
    
const storedUsers = JSON.parse(localStorage.getItem("users"));  //getting Registered Users from Local Storage

//storing the users in UserItem components               
const usersList = storedUsers.map((user) => (
    <UserItem
      key={user.id}
      id={user.id}
      name={user.email}
      password={user.password}
    />
  ));
  

  return (
    <section className={classes.users}>
        <ul>{usersList}</ul>
    </section>
  );
};

export default Admin;