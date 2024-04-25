import Header from "../Components/Header.jsx"
import LoginForm from '../Components/LoginForm.jsx'
import Banner from '../Components/Banner.jsx'
import CreateAccountForm from '../Components/CreateAccountForm.jsx'

function CreateAccountPage(props){

    //populates page
    return(
        <>
        <Header/>
        <Banner/>
        <CreateAccountForm/>
        </>
    )
}

export default CreateAccountPage;