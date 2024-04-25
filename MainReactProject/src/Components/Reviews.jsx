import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Review from "./Review.jsx";

function Reviews(props){

    //Maps each data element to a review and returns it
    return (
        <>
        <Row className="justify-content-center">
          {props.data.map((data, index) => (
          <Col sx sm md lg xl xxl={10} className="reviewCol">
            <Review author = {data.userID} restaurant = {data.restaurant} title = {data.title} stars = {data.stars} content = {data.content} image={data.image}/>
          </Col>
        ))}
        </Row>
        </>
      );
    
}

export default Reviews;