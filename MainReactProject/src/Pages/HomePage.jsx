import Header from "../Components/Header.jsx"
import Banner from "../Components/Banner.jsx"
import Reviews from "../Components/Reviews.jsx"
import Menu from "../Components/NavMenu.jsx";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useRef, useEffect } from 'react'

function HomePage(props){

    //State variables for the searching
    const [barText, setBarText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [reviewData, setReviewData] = useState([]);
    const [error, setError] = useState(false);
    const menuVal = useRef("0");

    //Updates whenever new letters go in the search bar
    const handleInputChange = (evt) =>{
        setBarText(evt.target.value);
    }

    //Called when search is submitted. Causes use effect to run
    const handleSearch = () =>{
        setSearchText(barText);
    }

    //Gets the reviewData. Runs whenever a search is run
    useEffect(() => {
        
        //Which query to run
        const searchType = menuVal.current.value;

        let URL = undefined;

        //base request options to be modified
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          };

        //Determine type of request from server and set the body
        if(searchType == "0" || searchType == "1"){
            URL = "http://localhost:3000/userPosts/";
            requestOptions.body = JSON.stringify({ "userID": searchText});
        }else if(searchType == "2"){
            URL = "http://localhost:3000/restaurantPosts/";
            requestOptions.body = JSON.stringify({ "restaurant": searchText});
        }else{
            URL = "http://localhost:3000/starPosts/";
            requestOptions.body = JSON.stringify({ "stars": searchText});
        }
  
        //The search should not be an error
        setError(false);
        
        //Fetches the review data from the backend server
        const fetchData = async () => {
          try {
            const response = await fetch(URL, requestOptions);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if(data.length == 0){
                throw new Error('Search Empty.');
            }else if(data[0].length == 0){
                throw new Error('Search Empty.');
            }
            setReviewData(data);
          } catch (error) {
            console.error('Error fetching review data:', error);
  
            //Alert the user on the page of the error
            setError(true);
          }
        };
        fetchData();
    }, [searchText]);
    
    //return page if logged in. Otherwise, redirect to login
    if (props.loggedIn){
        return(
            <>
            <Header/>
            <Menu loggedIn = {props.loggedIn} userName={props.userName} setLoggedIn={props.setLoggedIn}/>
            {error ? <p key = {0} className="searchError">Your search came up empty. Check your search terms and network connection.</p> : null}
            <Banner/>
            <Container fluid className="searchContainer">
                <Row className="searchRow">
                    <Col sx sm md lg xl xxl={2} className="leftLabelCon"><label className="searchLabel" htmlFor="searchbox">Search Reviews:</label></Col>
                    <Col sx sm md lg xl xxl={6}><input id="searchbox" className="mainEntry" style={{width:'100%'}} type="text" value={barText} onChange={handleInputChange} /></Col>
                    <Col sx sm md lg xl xxl={2}>
                        <Form.Select ref={menuVal}>
                            <option value="0">Search By:</option>
                            <option value="1">User</option>
                            <option value="2">Restaurant</option>
                            <option value="3">Stars</option>
                        </Form.Select>
                    </Col>
                    <Col sx sm md lg xl xxl={2} className="searchButtonCon"><Button onClick={handleSearch}>Search</Button></Col>
                </Row>
                <Reviews data={reviewData}/>    
            </Container>
            </>
        );
    }else{
        //redirect to login
        window.location.href = '/';
    }
}

export default HomePage;