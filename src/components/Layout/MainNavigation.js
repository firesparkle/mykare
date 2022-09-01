import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

//style Import
import classes from "./MainNavigation.module.css";

//Store Import
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
	const history = useHistory();
	const authCtx = useContext(AuthContext);

	const logoutHandler = () => {
		authCtx.logoutStateHandler();

		localStorage.setItem("login", false);
		history.replace("/");
	};

	return (
		<header className={classes.header}>
			<Link to="/">
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
