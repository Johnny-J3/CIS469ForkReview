import { useState, useRef } from 'react'
import "../CSSFiles/PostComponent.css"

function CreatePostForm(props){

    //states for form entries
    const title = useRef(null);
    const restaurant = useRef(null);
    const stars = useRef(null);
    const content = useRef(null);
    const [error, setError] = useState(false);
    const [fileName, setFileName] = useState(null);
    const fileRef = useRef(null);

    //later used in post request
    let userID = props.userName;

    //when it is submitted
    const formHandler = (evt) => {
        evt.preventDefault();
        handleNewPost(title.current.value, restaurant.current.value, stars.current.value, content.current.value, fileRef.current.files[0].name);
    }

    //makes the post request to the server to submit the form
    const handleNewPost = (titleVal, restaurantVal, starsVal, contentVal, imageVal) =>{
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "userID": userID, "title": titleVal, "restaurant": restaurantVal, "stars": starsVal, "content": contentVal, "image": imageVal})
        };
        fetch("http://localhost:3000/post/", requestOptions)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            if (data.userID != "False"){
              alert("Post Successfully Added!");
              //redirect to the homepage
            }else{
              console.log("Failed to create post");
              //alerts user of the error
              setError(true);
            }
          });
        
        //resets entry boxes after submimssion
        title.current.value = "";
        restaurant.current.value="";
        stars.current.value=null;
        content.current.value="";
        fileRef.current.value=null;
    }
    
    //populate the component if logged in
    if (props.loggedIn){
        return(
            <>
            <div class="pageHolder">
                {error ? <p key = {0} className="logError">Error creating the post.</p> : null}
                <h2>Create a Review</h2>
                <form class="createPostForm" onSubmit={formHandler}>
                    <fieldset class="reviewFieldset">
                        <div className="subContainer">
                            <label for="title">Review Title<br/></label>
                            <input type="text" name="title" ref={title} required/>
                        </div>
                        <div className="subContainer">
                            <label for="restaurant">Restaurant<br/></label>
                            <input type="text" name="restaurant" ref={restaurant} required/>
                        </div>
                        <div className="subContainer">
                            <label for="stars">Stars</label><br/>
                            <input className="starInput" type="number" name="stars" min="1" max="5" ref={stars} required/>
                        </div>
                        <div className="subContainer">
                          <label for="image">Upload Image</label><br/>
                          <input type="file" id="image" name="image" accept="image/png, image/jpeg" ref={fileRef} required/>
                        </div>
                        <div className="subContainer">
                            <label for="reviewText">Review Content<br/></label>
                            <textarea name="reviewText" rows="8" cols="50" ref={content} required/>
                        </div>
                        <button className="submitButton" type="submit">Submit</button>
                    </fieldset>
                </form>
            </div>
        </>
        );
    }else{
        //redirect if not logged in
        window.location.href = '/';
    }
}

export default CreatePostForm;