import Header from "../Components/Header.jsx"
import CreatePostForm from "../Components/CreatePostForm.jsx"
import Banner from "../Components/Banner.jsx"
import Menu from "../Components/NavMenu.jsx";

function CreatePostPage(props){

    //Redirect to login if not logged in. Otherwise, populate page
    if (props.loggedIn){
        return(
            <>
            <Header/>
            <Menu loggedIn = {props.loggedIn} userName={props.userName} setLoggedIn = {props.setLoggedIn}/>
            <Banner/>
            <CreatePostForm loggedIn = {props.loggedIn} userName={props.userName} setLoggedIn={props.setLoggedIn}/>
            </>
        );
    }else{
        //redirect to login
        window.location.href = '/';
    }
}

export default CreatePostPage;