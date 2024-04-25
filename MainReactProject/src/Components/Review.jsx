import Card from 'react-bootstrap/Card';

function Review(props) {

    //holds the actual review data that was fetched from the database. 
    //Sets the display of that data into a card
    return (
        <>
          <Card className ="reviewCard border-0" fullWidth>
          <Card.Body className="reviewCard">
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                By: {props.author}<br/>
                Reviewing: {props.restaurant}<br/>
                {props.stars} stars<br/>
                <div className="rev2Col">
                  <img src={"../../public/" + props.image} alt="Uploaded Image"/>
                <p>{props.content}<br/></p>
                </div>
                </Card.Text>
            </Card.Body>
          </Card>
        </>
    );

}

export default Review