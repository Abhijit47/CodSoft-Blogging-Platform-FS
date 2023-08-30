const Post = require('./../models/postModel');
const { successResponse, errorResponse } = require('../utilities/utils');
const { createPostValidation } = require('../validators/postValidator');

const createPost = async (req, res, next) => {
  // console.log('create post', req.user);
  try {
    // get data from body
    const { title, body } = req.body;
    // console.log({ title, body });

    // validate data
    const { error } = await createPostValidation(req.body);
    if (error) {
      errorResponse(res, 403, "Validation error.", error.details[0].message);
    }

    // create a post
    const newPost = await Post.create({
      title: title,
      body: body,
      postedBy: req.user
    });

    // save this post
    const savePost = await newPost.save();

    // send back a response to user
    successResponse(res, 201, "Post created successfully.", savePost);
  } catch (error) {
    return errorResponse(res, 400, "Something went wrong in create post.", error.message);
  }
};

const myPost = async (req, res, next) => {
  try {
    const myPost = await Post.find({ postedBy: req.user._id })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .exec();
    successResponse(res, 200, "Success", myPost);
  } catch (error) {
    return errorResponse(res, 400, "Something went wrong in my post.", error.message);
  }
};

const allPost = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .exec();
    successResponse(res, 200, "Success", posts);
  } catch (error) {
    return errorResponse(res, 400, "Something went wrong in all post.", error.message);
  }
};

const commentOnePost = async (req, res, next) => {
  try {
    // try to get postId from body request
    const postId = req.body.postId;
    // try to get comment from body request
    const comment = {
      comment: req.body.comment,
      postedBy: req.user._id,
    };

    // lets find a post with post id and add a comment and update this post
    const addOneComment = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    // console.log(addOneComment.postedBy);
    successResponse(res, 200, "success", addOneComment);
  } catch (err) {
    return errorResponse(res, 400, "Something went wrong with comments.", err.message);
  }
};

const getOnePost = async (req, res, next) => {
  try {
    // get id from req.params
    const id = req.params.id;
    if (id.length !== 24) {
      return errorResponse(res, 400, 'Post id isn\'t correct.');
    }

    // find the post associate with this id
    const post = await Post.findById({ _id: id })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .exec();

    // send response back to the user
    successResponse(res, 200, 'success', post);

  } catch (err) {
    return errorResponse(res, 400, "Something went wrong with post.", err.message);
  }
};


module.exports = { createPost, allPost, myPost, commentOnePost, getOnePost };