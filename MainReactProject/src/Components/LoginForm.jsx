import "../CSSFiles/LoginComponent.css"
import {Link, Navigate} from "react-router-dom";
import { useState, useRef } from 'react'
function LoginForm(props){

    //states to hold form data
    const userVal = useRef(null);
    const passVal = useRef(null);
    const [error, setError] = useState(false);
    const [red, setRedirect] = useState(false);

    //when form submitted
    const formHandler = (evt) => {
        evt.preventDefault()
        handleLogin(userVal.current.value, passVal.current.value)
    }

    //handles the validation with the server
    const handleLogin = (userVal, passVal) =>{
        console.log(userVal);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "userID": userVal, "password": passVal })
        };
        fetch("http://localhost:3000/users/", requestOptions)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then((data) => {
            if (data.length > 0 && data[0].userID === userVal && passVal === data[0].password){
              props.setloggedIn(true);
              props.setUserName(userVal);
              //redirect the page to home of successful
              setRedirect(true);
            }else{
              //alert the user of an error if it failed
              console.log("Login Failed");
              setError(true);
            }
          });
      }
    
    //populate the component if it shouldn't redirect
    if(!red){
      return(
        <>
            <div className="loginContainer">
                <form onSubmit={formHandler}>
                        <fieldset className="loginFieldset">
                            {error ? <p key = {0} className="logError">There was an error with the login.</p> : null}
                            <h2>Log Into ForkReview</h2>
                            <div className="userContainer">
                                <input type="text" name="username" placeholder="Username" ref={userVal}/>
                            </div>
                            <div className="passContainer">
                                <input type="password" name="password" placeholder="Password" ref={passVal}/>
                            </div>
                            <button className="loginButton" type="submit">Log In</button>
                            <p>Don't have an account? Create one <a href="/create">here</a></p>
                        </fieldset>
                </form>
            </div>
        </>
      );
    }else{
      //redirect home if logged in
      return(<>
        <Navigate
            to={{
            pathname: "/Home",
            state: { userName: props.userName, loggedIn: props.loggedIn }
          }}
        />
      
      </>

      );
    }
}

export default LoginForm;