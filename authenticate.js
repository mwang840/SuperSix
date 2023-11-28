const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config.env" });

const app = express();
const port = 8080;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());


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
  password:{
    type:String,
    required: true,
    unique: true
  }, 
  id:{
  type:Number,
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

//All get methods to get the information from all of the pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
  console.log("Express loads on main page!");
});
7

app.get("/boardgame.html", (req, res) => {
  res.sendFile(path.join(__dirname + "/boardgame.html"));
});

//Apparentally post methods dont work on res.sendFile (insert picardface palm emoji error)
app.get("/sign-up", (req, res)=>{
  res.sendFile(path.join(__dirname + "/register.html"));
});
//Post method for registering a user to the database
app.post("/sign-up",  (req, res) => {
  //Sends the file indexhtml under the sign up directory
  const { emailAddress, password, id } = req.body;
  console.log("Email ", emailAddress);
  console.log("Password ", password);
  console.log("Id ", id);
  User.findOne({emailAddress: emailAddress}).exec().then(async user=>{
    if(user){
      console.log("Error, that email is already taken!");
      res.status(400).json({ errors: [{ msg: "User already exists in our database!" }] });
    }
    else{
      //Matches the user via id and sees if it can find the id, if not found then register to db
      console.log("Going to register user!");
      let id = 0;
      let matchingId = false;
      do{
        id++;
        await User.findOne({ id: id }).exec().then(user => {
        if (!user) matchingId = true;
        })
      }
      while(!matchingId);
      //Creates the new user object
      //Inserts one collection into the database
      connection.collection("User").insertOne({emailAddress, password, id});
      //This code works, sends the file back to boardgame html page!
      res.sendFile("boardgame.html", { root: "./"})
    }
  })
});

app.get("/login", (req, res)=>{
  res.sendFile(path.join(__dirname + "/login.html"));
});

// Logs in a user to the website
app.post("/login", (req, res)=>{
  const {emailAddress, password, id} = req.body;
  User.findOne({emailAddress:email}).exec().then((user)=>{
    if(user){
      if(password === user.password && id === user.id){
        res.send({user: user, message: " can login to the game"})
        res.sendFile("boardgame.html", {root: "./"})
      }
      else{
        res.send({user: user, message: " can not login to the game due to an incorrect password"})
      }
    }
    else{
      res.status(400).json({ errors: [{ msg: "User does not exist exists in our database!" }] });
    }
  })
});

//Tells the server express is being used
app.use("/", express.static(path.join(__dirname, "")));

app.listen(port, () => {
  console.log(`Looks like this app is running on port ${port}`);
});
