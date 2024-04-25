import "../CSSFiles/LoginComponent.css"
import { useState, useRef } from 'react'
function CreateAccountForm(props){

    //references to hold form data
    const userVal = useRef(null);
    const passVal1 = useRef(null);
    const passVal2 = useRef(null);
    const [error, setError] = useState(0);

    //on form submit, create the account
    const submit = (evt) => {
        evt.preventDefault()
        handleCreateAccount(userVal.current.value, passVal1.current.value, passVal2.current.value)
    };
    
    //contacts server to create account
    const handleCreateAccount = (userVal, passVal1, passVal2) => {
        //small input validation
        if(passVal1 === passVal2 && userVal.length > 3 && passVal1.length >= 3){
          
          // Make a post request to the server to add the user
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "userID": userVal, "password": passVal1 })
          };
          fetch('http://localhost:3000/user/', requestOptions)
            .then((res) => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.json();
            })
            .then(data => {
              if(data.userID != null){
                alert("Account Successfully Created");
                window.location.href = '/';
              }else{
                console.log(data);
                //makes error appear on screen
                setError(2);
              }
            });
        }else{
          //makes error appear on screen
          setError(1);
        }
        
      }

    //populates the form on the screen
    return(
        <>
            <div className="loginContainer">
                <form onSubmit={submit}>
                        <fieldset className="loginFieldset">
                            {error == 1 ? <p key = {0} className="logError">Invalid inputs.</p> : error == 2 ? <p key = {1} className="logError">User already exists.</p> : null}
                            <h2>Create a new Account</h2>
                            <div className="userContainer">
                                <input type="text" name="username" placeholder="Username" ref={userVal}/>
                            </div>
                            <div className="passContainer">
                                <input type="password" name="password" placeholder="Password" ref={passVal1}/>
                            </div>
                            <div className="passContainer">
                                <input type="password" name="password" placeholder="Vaidate Password" ref={passVal2} />
                            </div>
                            <button className="loginButton" type="submit">Create Account</button>
                        </fieldset>
                </form>
            </div>
        </>
    )
}

export default CreateAccountForm;