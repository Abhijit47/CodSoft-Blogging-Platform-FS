const User = require('./../models/userModel');
const Post = require('./../models/postModel');
const bcrypt = require('bcrypt');
const { successResponse, errorResponse, createToken } = require('../utilities/utils');
const { signUpValidation, signInValidation } = require('../validators/userValidator');

const signUp = async (req, res, next) => {
  try {
    // get data from body
    const { name, email, password } = req.body;

    // validate data
    const { error } = await signUpValidation({ name, email, password });
    if (error) {
      return errorResponse(res, 403, "Validation error", error.details[0].message);
    }

    // check email is exist or not
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return errorResponse(res, 400, "User is already exist! Try to login...");
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    // save this user
    const saveUser = await newUser.save();
    const { _id, created_At } = saveUser;

    // send a response
    successResponse(res, 201, "Sign up successful.", { _id, name, email, created_At });

  } catch (err) {
    return errorResponse(res, 400, "Something went in signup", err.message);
  }
};

const signIn = async (req, res, next) => {
  try {
    // get data from body
    const { email, password } = req.body;

    // validate data
    const { error } = await signInValidation({ email, password });
    if (error) {
      return errorResponse(res, 403, "Validation error", error.details[0].message);
    }

    // check email is correct or not
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return errorResponse(res, 400, "Invalid email or password!");
    }

    // check password is correct or not
    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return errorResponse(res, 400, "Invalid email or password!");
    }

    // create a token
    const { _id, name } = existingUser;
    const payload = { _id, name, email };
    const token = createToken(payload, process.env.ACCESS_TOKEN);

    // send this token with user details to user
    successResponse(res, 200, 'Sign in successfull.', { token, _id, name, email });

  } catch (err) {
    return errorResponse(res, 400, "Something went in signup", err.message);
  }
};

const searchUser = async (req, res, next) => {
  try {
    // create a regex pattern match the user query.
    let userpattern = new RegExp("^" + req.body.query);

    //search a user User Schema for user whose email matches with the pattern
    const user = await User.find({ email: { $regex: userpattern } })
      .select("-password");

    // const userID = user[0]._id;
    // const posts = await Post.find({ _id: userID })
    //   .populate("postedBy", "_id name")
    //   .exec();

    //send a response
    successResponse(res, 200, 'success', user);
    // successResponse(res, 200, 'success', { user, posts });

  } catch (err) {
    return errorResponse(res, 400, "Something went in search", err.message);
  }
};

// router.post("/searchUser", async (req, res) => {
//   try {
//     //create a regex pattern match the user query.
//     let userpattern = new RegExp("^" + req.body.query);

//     //search a user User Schema for user whose email matches with the pattern 
//     const users = await User.find({ email: { $regex: userpattern } });

//     //send a response 
//     res.json({ users });
//   } catch (error) {
//     return res.status(422).json({ error: err });
//   }
// })

module.exports = { signUp, signIn, searchUser };