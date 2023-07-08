const asyncHandler = require("express-async-handler");

const generateToken = require("../config/generateToken");
const  {User} = require("../model/user");

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username|| !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
   

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(401);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    username,
    password,
    
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });
  if(user==null)
  {
    res.status(404);
    throw new Error("User Not Found");
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Password");
  }
});


module.exports = {registerUser,authUser}