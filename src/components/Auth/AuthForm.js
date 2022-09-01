import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

//Style Import
import classes from "./AuthForm.module.css";

//Store Import
import AuthContext from "../../store/auth-context";

const isEmpty = (value) => value.trim() === ""; //Email and password validation functions
const isEightChars = (value) => value.trim().length >= 8;

const AuthForm = () => {
	const history = useHistory();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const authCtx = useContext(AuthContext);

	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [formInputsValidity, setFormInputsValidity] = useState({
		email: true,
		password: true,
	});

	// let emailErrorMessage = "Enter a Valid Email";
	const [emailErrorMessage, setEmailErrorMessage] = useState(
		"Enter a Valid Email"
	);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
		setFormInputsValidity({ email: true, password: true });
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		const enteredEmailIsValid = !isEmpty(enteredEmail); //email validation
		const enteredPasswordIsValid = isEightChars(enteredPassword); //password validation

		const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

		if (!formIsValid) {
			//checking form validity
			setFormInputsValidity({
				email: enteredEmailIsValid,
				password: enteredPasswordIsValid,
			});
			return;
		}

		//checking user loggin info
		if (isLogin) {
			const users = JSON.parse(localStorage.getItem("users"));
			if (users) {
				const founduserindex = users.findIndex(
					(user) => user.email === enteredEmail
				);
				const founduser = users[founduserindex];
				if (
					founduser &&
					founduser.email === enteredEmail &&
					founduser.password === enteredPassword &&
					enteredEmail === "admin@gmail.com"
				) {
					authCtx.loginStateHandler(true);
					localStorage.setItem("admin", true);
					history.replace("/admin");
				} else if (
					founduser &&
					founduser.email === enteredEmail &&
					founduser.password === enteredPassword
				) {
					authCtx.loginStateHandler(false);
					history.replace("/profile");
				} else {
					setFormInputsValidity({
						email: false,
						password: false,
					});
					return;
				}
			} else {
				setFormInputsValidity({
					email: false,
					password: false,
				});
				return;
			}
		}
		//checking user creation Info
		else {
			const users = JSON.parse(localStorage.getItem("users"));
			if (users) {
				const founduserindex = users.findIndex(
					(user) => user.email === enteredEmail
				);
				const founduser = users[founduserindex];
				if (founduser) {
					setFormInputsValidity({
						email: false,
						password: true,
					});
					// emailErrorMessage = "User Already Exists";
					setEmailErrorMessage("User Already Exists");
					// alert("User already Exists");
				} else {
					users.push({
						id: users.length,
						email: enteredEmail,
						password: enteredPassword,
					});
					localStorage.setItem("users", JSON.stringify(users));
					authCtx.loginStateHandler();
					history.replace("/profile");
				}
			} else {
				const users = [];
				users.push({
					id: users.length,
					email: enteredEmail,
					password: enteredPassword,
				});
				localStorage.setItem("users", JSON.stringify(users));
				authCtx.loginStateHandler();
				history.replace("/profile");
			}
		}
	};

	// Adding error classes to classname if email or password is incorrect
	const emailControlClasses = `${classes.control} ${
		formInputsValidity.email ? "" : classes.invalid
	}`;
	const passwordControlClasses = `${classes.control} ${
		formInputsValidity.password ? "" : classes.invalid
	}`;

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? "Login" : "Sign Up"}</h1>
			<form onSubmit={submitHandler}>
				<div className={emailControlClasses}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" required ref={emailInputRef} />
					{!formInputsValidity.email && <p>{emailErrorMessage}</p>}
				</div>
				<div className={passwordControlClasses}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						required
						ref={passwordInputRef}
					/>
					{!formInputsValidity.password && (
						<p>Please enter a valid password!</p>
					)}
				</div>
				<div className={classes.actions}>
					{!isLoading && (
						<button>{isLogin ? "Login" : "Create Account"}</button>
					)}
					{isLoading && <p>Sending request...</p>}
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? "Create new account" : "Login with existing account"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
