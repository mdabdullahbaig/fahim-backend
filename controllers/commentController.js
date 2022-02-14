const Comment = require("../models/commentModal");

const createComment = async (req, res, next) => {
  const { message, userId } = req.body;

  const comment = new Comment({
    message,
    userId,
  });

  try {
    await comment.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(201).json(comment);
};

const getAllComment = async (req, res, next) => {
  let comments;

  try {
    comments = await Comment.find({}).populate("userId");
  } catch (error) {
    next(error);
  }

  res.status(200).json(comments);
};

const getYourComments = async (req, res, next) => {
  const userId = req.params.userId;
  let comments;

  try {
    comments = await Comment.find({ userId }).populate("userId");
  } catch (error) {
    next(error);
  }

  res.status(200).json(comments);
};

exports.createComment = createComment;
exports.getAllComment = getAllComment;
exports.getYourComments = getYourComments;
