import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./Components/Header.jsx"
import LoginForm from './Components/LoginForm.jsx'
import Banner from './Components/Banner.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import CreateAccountPage from './Pages/CreateAccountPage.jsx'
import CreatePostPage from './Pages/CreatePostPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import "./bootstrap.min.css";
import "./index.css";

import { 
  BrowserRouter as Router, Routes, 
  Route
} from "react-router-dom";

function App() {

  //props that will go to various pages
  const [loggedIn, setloggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  //acts as a router to the rest of the pages in the app
  return (
    <>
      <Router> 
        <Routes> 
            <Route path="/" 
              element={<LoginPage setloggedIn = {setloggedIn} loggedIn = {loggedIn} setUserName = {setUserName} />} 
            />  
            <Route path="/create"
              element={<CreateAccountPage/>}
            />
            <Route path="/NewPost" render={(props) => <CreatePostPage {...props}/>} element={ <CreatePostPage loggedIn = {loggedIn} userName={userName}/>}/>
            <Route path="/Home" render={(props) => <HomePage {...props}/>} element={ <HomePage loggedIn = {loggedIn} userName={userName}/>}/>

        </Routes> 
      </Router> 
      {/*
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
    </p>*/
    /*<Route path="/NewPost" element={ <CreatePostPage loggedIn = {loggedIn} userName={userName}/>}/>*/}
    </>
  )
}

export default App
