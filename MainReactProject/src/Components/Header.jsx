import '../CSSFiles/HeaderComponent.css'
import Logo from "../assets/fork_logo.png"

function Header(){

    //populates the title on the top header
    return(
        <>
            <header>
                {/*Logo from https://icon-icons.com/icon/fork/126497, https://cdn.icon-icons.com/icons2/2070/PNG/512/fork_icon_126497.png*/}
                <img src={Logo} alt="Logo"/>
                <h1>ForkReview</h1>
            </header>
        </>
    )
}

export default Header;