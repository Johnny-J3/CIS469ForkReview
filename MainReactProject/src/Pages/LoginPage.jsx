import Header from "../Components/Header.jsx"
import LoginForm from '../Components/LoginForm.jsx'
import Banner from '../Components/Banner.jsx'

function LoginPage(props){

    //populates page with various components
    return(
        <>
        <Header/>
        <Banner/>
        <LoginForm setloggedIn = {props.setloggedIn} loggedIn = {props.loggedIn} setUserName={props.setUserName}/>
        </>
    )
}

export default LoginPage;