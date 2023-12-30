const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const session = require("express-session");
require("dotenv").config({ path: "./config.env" });
require("dotenv").config({path: "./process.env"});

//Setting up express
const app = express();
const port = 8080;
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
console.log("At last the database is connected");

//Creating the user schema
const userSchema = new mongoose.Schema({
  emailAddress: {
    type:String,
    required: true,
    unique: true
  },
  userName:{
    type:String,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required: true,
    unique: true
  }, 
});

//Forgot to include the salt methods, important for cyber reasons
userSchema.pre('save', async function(next){
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    console.log(user.password);
    next();
  } catch (error) {
    return next(error);
  }
})
//Compare passwords to see if the password when logging in is correct
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};



//Sets up the user schema in the mongo database
const User = new mongoose.model("User", userSchema);




//Post method for registering a user to the database
app.post("/api/sign-up",  async(req, res) => {
  //Sends the file indexhtml under the sign up directory
  console.log("Making a post request after signing up")
  const { emailAddress, userName, password} = req.body;
  try{
    const existingUser = await User.findOne({emailAddress}).exec();
    if (existingUser) {
      console.log("Email is ", existingUser.emailAddress);
      console.log("Error, that email is already taken!");
      return res.status(400).json({ errors: [{ msg: "User already exists in our database!" }] });
    }
    const newUser = new User({ emailAddress, userName, password });
    console.log("Going to register user!");
    await newUser.save();
    
  }
  catch (error){
    console.error(error);
    res.status(500).send('Internal server error');
  }
  res.redirect("/user-account/user_profile.html")
});



app.get("/login", (req, res)=>{
  res.redirect("/login/login.html")
});

// Logs in a user to the website
app.post("/api/login", (req, res)=>{
  const {emailAddress, userName, password} = req.body;
  User.findOne({userName}).exec().then((user)=>{
    if(user){
      if(user.comparePassword(password)){
        res.redirect("/user-account/user_profile.html");
      }
      else{
        console.error("You can not login to the game due to an incorrect password");
        res.send({user: user, message: " can not login to the game due to an incorrect password"})
      }
    }
    else{
      res.status(400).json({ errors: [{ msg: "User does not exist exists in our database!" }] });
    }
  })
});

//endpoint for logging out
app.get("/logout", (req, res)=>{
    req.session.destroy((err)=>{
      if (err) {
        return res.status(500).send('Error logging out');
      }
      res.redirect('/index.html');
    })
})

app.get("/editProfile", (req, res)=>{
  res.redirect("/editProfile/editProfile.html");
})

//end point to change user account name
// app.get('/editProfile/:username', (req, res) => {
//   const username = req.params.username;

//   // Fetch user details from MongoDB by username
//   User.collection('users').findOne({ username: username }, (err, user) => {
//     if (err) {
//       console.error('Error trying to find the user', err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }

//     if (!user) {
//       res.status(404).send('User not found');
//       return;
//     }

//     res.render('editProfile', { user });
//   });
// })

app.post('/editProfile/:userName', async(req, res) => {
  //Grabs the username from the profile
  const username = req.params["userName"];
  console.log("Old username is ", username)
  const newUserName = req.body;
  console.log("New Username is ", newUserName);
  //creates the collection from the database
  try{
    const updatedUser = await User.updateOne({
      userName: username},
      {$set: {userName: newUserName}});
    if (result.modifiedCount === 0) {
        res.status(404).send("Cannot find the user in the database");
        return;
    }
    console.log(`Username for ${oldUsername} updated to ${newUsername}`);
    res.redirect(`/user-account/user_profile.html`);
  }
  catch(err){
    console.error('Error updating the username:', err);
    res.status(500).send('Internal Server Error');
  }
});


// app.get("/user-account", (req, res)=>{
//   const {emailAddress, password} = req.body;
//   res.send("<h1>Welcome "+emailAddress+"!</h1>");
// })

//Tells the server express is being used
app.use("/", express.static(path.join(__dirname, "")));

app.listen(port, () => {
  console.log(`Looks like this app is running on port ${port}`);
});
