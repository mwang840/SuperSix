const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
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



// app.get("/boardgame.html", (req, res) => {
//   res.sendFile(path.join(__dirname + "/boardgame.html"));
// });


//Post method for registering a user to the database
app.post("api/sign-up",  (req, res) => {
  //Sends the file indexhtml under the sign up directory
  console.log("Making a post request after signing up")
  const { emailAddress, password} = req.body;
  console.log("Email ", emailAddress);
  console.log("Password ", password);
  try{
    const existingUser = User.findOne({emailAddress}).exec();
    if (existingUser) {
      console.log("Email is ", existingUser.emailAddress);
      console.log("Error, that email is already taken!");
      return res.status(400).json({ errors: [{ msg: "User already exists in our database!" }] });
    }
    const newUser = new User({ emailAddress, password });
    console.log("Going to register user!");
    newUser.save();
    res.sendFile("boardgame.html", { root: "./" });
  }
  catch (error){
    console.error(error);
    res.status(500).send('Internal server error');
  }
  res.status(200).send('Request processed successfully');
});


app.get("/login", (req, res)=>{
  res.sendFile(path.join(__dirname + "/login.html"));
});

// Logs in a user to the website
app.post("/login", (req, res)=>{
  const {emailAddress, password, id} = req.body;
  User.findOne({emailAddress}).exec().then((user)=>{
    if(user){
      if(password === user.password && id === user.id){
        res.send({user: user, message: " can login to the game"});
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


//All get methods to get the information from all of the pages
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/index.html"));
//   console.log("Express loads on main page!");
// });


//Tells the server express is being used
app.use("/", express.static(path.join(__dirname, "")));

app.listen(port, () => {
  console.log(`Looks like this app is running on port ${port}`);
});
