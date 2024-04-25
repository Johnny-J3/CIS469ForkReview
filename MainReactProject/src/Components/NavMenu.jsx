import '../CSSFiles/HeaderComponent.css'
import { Link } from "react-router-dom";

function Menu(props){

    //populates the top menu with buttons and links
    return(
        <>
            <div className="topMenu">
            <Link to={{
            pathname: "/Home",
            state: { userName: props.userName, loggedIn: props.loggedIn }
          }}>
                <button className="menuButton">Home</button>
            </Link>
            <Link to={{
            pathname: "/NewPost",
            state: { userName: props.userName, loggedIn: props.loggedIn }
          }}>
                <button className="menuButton">Write Review</button>
            </Link>
                
            </div>
        </>
    )
}

export default Menu;