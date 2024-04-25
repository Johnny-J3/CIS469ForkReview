const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Set up server
const PORT = 3000;
// Listen for incoming requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Connection URI for the MongoDB instance
const uri = 'mongodb+srv://Admin:ReactJSProject@test.zeihrbu.mongodb.net/?retryWrites=true&w=majority&appName=Test';

// Connect to the MongoDB instance
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
    // Use the connection to perform CRUD operations on the database
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

const { Schema } = mongoose;

// Define a schema for a "user" document
const userSchema = new Schema({
  userID: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define a schema for a "post" document
const postSchema = new Schema({
  postID: { type: Number, required: true },
  userID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  title: { type: String, required: true },
  restaurant: { type: String, required: true },
  stars: { type: Number, required: true },
  content: { type: String, required: true },
  image: {type: String, required: true},
});

// Create a Mongoose model for the "user" collection
const User = mongoose.model('User', userSchema);

// Create a Mongoose model for the "post" collection
const Post = mongoose.model('Post', postSchema);

// Endpoint to get a user for validation
app.post('/users/', (req, res) => {
    const id = req.body.userID;
    console.log(id);
    User.find({userID: id})
        .then((user) => {
            res.json(user);
    })
        .catch((err) => {
            console.error(err);
    });
});

// Endpoint to add a new user
app.post('/user/', (req, res) => {
    const id = req.body.userID;
    console.log(id);
    User.find({userID: id})
        .then((user) => {
            if(user.length == 0){
              const newUser = new User(req.body);
              newUser.save()
                .then(user => res.json(user))
                .catch(err => console.error(err));
            }else{
              res.json({});
            }
    });
});

// Endpoint to add a new post
app.post('/post/', (req, res) => {
  const uID = req.body.userID;
  req.body.postID = 1;
  console.log(uID);
  //Find that user's highest post id and set the next post id
  Post.find({userID: uID}).sort({"postID":-1}).limit(1)
    .then((post) =>{
      if(post.length > 0){
        req.body.postID = post[0].postID + 1;
      }
       //Create the new post
      const newPost = new Post(req.body);

      //Save the new post
      newPost.save()
        .then(post => res.json(post))
        .catch(err => {
          console.error(err);
          res.json({"userID": "False"});}
      );
    })

});

// Endpoint to get posts from user
app.post('/userPosts/', (req, res) => {
  const uID = req.body.userID;
  console.log(uID);
  
  //find all the posts from that user and return as a json
  Post.find({userID: { $regex: '.*' + uID + '.*', $options: 'i'  }}).sort({createdAt: -1})
    .then((post) =>{
      res.json(post);
    })
    .catch((err) =>{
      console.error(err);
      res.json({});
    })

});

// Endpoint to get posts about a restaurant
app.post('/restaurantPosts/', (req, res) => {
  const restaurant = req.body.restaurant;
  console.log(restaurant);
  

  //find all the posts from that user and return as a json
  //Post.find({restaurant: str.concat(restaurant, "/")}).sort({createdAt: -1})
  Post.find({restaurant: { $regex: '.*' + restaurant + '.*', $options: 'i' }}).sort({createdAt: -1})
    .then((post) =>{
      res.json(post);
    })
    .catch((err) =>{
      console.error(err);
      res.json({});
    })

});

// Endpoint to get posts greater than a certain number of stars
app.post('/starPosts/', (req, res) => {
  const stars = req.body.stars;
  console.log(stars);
  
  //find all the posts meeting the criteria and return as a json
  Post.find({stars: {$gte: stars}}).sort({createdAt: -1})
    .then((post) =>{
      res.json(post);
    })
    .catch((err) =>{
      console.error(err);
      res.json({});
    })

});

// Find all documents in the collection
/*User.find()
.then((docs) => {
  alert.log(docs);
})
.catch((err) => {
  alert.log('Error querying documents:', err);
});*/

// Insert a single document
/*const user = new User({ userID: userName, password: password });
user.save()
  .then((result) => {
    alert.log(result);
  })
  .catch((err) => {
    alert.log('Error inserting document:', err);
  });*/