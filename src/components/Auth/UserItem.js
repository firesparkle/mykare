import classes from "./UserItem.module.css";

const UserItem = (props) => {
    
    return (
      <li className={classes.user}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.password}>{props.password}</div>
        </div>
      </li>
    );
  };
  
  export default UserItem;