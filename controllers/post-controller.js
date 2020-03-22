const { validationResult } = require("express-validator");
const User = require("../model/User");
const Post = require("../model/Post");
const Profile = require("../model/Profile");

const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    res.status(500).send("server error");
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // sort from latest post

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).send("server error");
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    res.json(post);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Post not found" });
    }
    res.send("server error");
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // check  user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User is not uthorized" });
    }
    await post.remove();
    res.json({ message: "Post removed" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Post not found" });
    }
  }
};

const addLikeToPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    // check if post has already has been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ message: "post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error);

    res.status(500).send("server error");
  }
};

const addUnLikeToPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    // check if post has already has been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ message: "post has not liked" });
    }
    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error);

    res.status(500).send("server error");
  }
};
const createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.postId);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.log(error);

    res.status(500).send("server error");
  }
};

const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    if (!comment) {
      res.status(404).json({ message: "comment is not found" });
    }
    if (comment.user.toString() !== req.user.id) {
      res.status(401).json({ message: "User is not authorized" });
    }
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.log(error);

    res.status(500).send("server error");
  }
};

exports.createPost = createPost;
exports.getAllPosts = getAllPosts;
exports.getPostById = getPostById;
exports.deletePost = deletePost;
exports.addLikeToPost = addLikeToPost;
exports.addUnLikeToPost = addUnLikeToPost;
exports.createComment = createComment;
exports.deleteComment = deleteComment;
