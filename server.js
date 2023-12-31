const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const session = require("express-session");
require("dotenv").config({ path: "./config.env" });
require("dotenv").config({ path: "./process.env" });

//Setting up express and its
const app = express();
const port = 8080;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// TODO: Add documentation for post/get/put methods
// TODO: Investigate session issues, when I went to update my username, after refreshing the page or a form action error (posting to the wrong url), the session disappeared
// TODO: Consolidate sections of the code to different sections


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

//Creating the user schema
const userSchema = new mongoose.Schema({
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

//Forgot to include the salt methods, important for cyber reasons
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});
//Compare passwords to see if the password when logging in is correct
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//Sets up the user schema in the mongo database
const User = new mongoose.model("User", userSchema);

/**
 * POST
 *
 * Signs the user up, accessing the email address, username, and password from request body
 *
 * @param req - The client request, contains email address, username, and password
 * @param res - The server response
 */
app.post("/api/sign-up", async (req, res) => {
  const { emailAddress, userName, password } = req.body;

  try {
    const existingUser = await User.findOne({ emailAddress }).exec();
    if (existingUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User already exists in our database!" }] });
    }

    const newUser = new User({ emailAddress, userName, password });
    await newUser.save();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
  res.redirect("/user-account/user_profile.html");
});

/**
 * GET
 *
 * Takes the user to the login page ensuring they get to the sign up page
 *
 * @param req - The client request, contains email address, username, and password
 * @param res - The server response, indicating they can login into the page
 */
app.get("/login", (req, res) => {
  res.redirect("/login/login.html");
});

/**
 * POST
 *
 * Logs in the user into the webpage, taking in the username and the password. Renders the user profile page if they are logged in, otherwise an error will occur if any of the two fields are incorrect
 *
 * @param req - The client request, contains username, and password
 * @param res - The server response, indicating they can login into the page successfully
 */
app.post("/api/login", (req, res) => {
  const { emailAddress, userName, password } = req.body;
  User.findOne({ userName })
    .exec()
    .then((user) => {
      if (user) {
        if (user.comparePassword(password)) {
          req.session.username = userName;
          res.redirect("/user-account/user_profile.html");
        } else {
          console.error(
            "You can not login to the game due to an incorrect password"
          );
          res.send({
            user: user,
            message: " can not login to the game due to an incorrect password",
          });
        }
      } else {
        res.status(400).json({
          errors: [{ msg: "User does not exist exists in our database!" }],
        });
      }
    });
});

/**
 * GET
 *
 * Logs out the user of the webpage, taking them back to the main page of the game
 *
 * @param req - The client request, once the user clicks the "sign out button"
 * @param res - The server response, indicating they can get back to the main page
 */
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/index.html");
  });
});


/**
 * GET
 *
 * Logs out the user of the webpage, taking them back to the main page of the game
 *
 * @param req - The client request, once the user clicks the "sign out button"
 * @param res - The server response, indicating they can get back to the main page atfer logging off
 */
app.get("/editProfile", (req, res) => {
  res.redirect("/editProfile/editProfile.html");
});

/**
 * POST
 *
 * Allows the user to edit their own profile, specifically their username
 *
 * @param req - The client request, once the user edits their username field
 * @param res - The server response, indicating whether changing the username is a success or a failure
 */
app.post("/editProfile", async (req, res) => {
  const username = req.session.username;
  const newUsername = req.body["userName"];

  try {
    const result = await User.updateOne(
      {
        userName: username,
      },
      { $set: { userName: newUsername } }
    );

    if (result.modifiedCount === 0) {
      res.status(404).send("Cannot find the user in the database");
    } else {
      res.redirect(`/user-account/user_profile.html`);
    }
  } catch (err) {
    console.error("Error updating the username:", err);
    res.status(500).send("Internal Server Error");
  }
});


//Tells the server express is being used
app.use("/", express.static(path.join(__dirname, "")));

app.listen(port, () => {
  console.log(`Looks like this app is running on port ${port}`);
});
