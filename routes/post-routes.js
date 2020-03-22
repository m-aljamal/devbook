const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const postController = require("../controllers/post-controller");
// @route        POST api/posts
// @desc         create a post
// @access       private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  postController.createPost
);

// @route      GET /api/posts
// @desc       Get all posts
// @access     private

router.get("/", auth, postController.getAllPosts);

// @route      GET /api/posts/:postId
// @desc       Get post by Id
// @access     private
router.get("/:postId", auth, postController.getPostById);

// @route      Delete /api/posts/:postId
// @desc       delete post by Id
// @access     private
router.delete("/:postId", auth, postController.deletePost);

// @route      put /api/posts/like/:postId
// @desc       Like a post
// @access     private
router.put("/like/:postId", auth, postController.addLikeToPost);
// @route      put /api/posts/unlike/:postId
// @desc       Like a post
// @access     private
router.put("/unlike/:postId", auth, postController.addUnLikeToPost);

// @route        POST api/posts/comment/:id
// @desc         Comment in post
// @access       private
router.post(
  "/comment/:postId",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  postController.createComment
);

// @route        Delete api/posts/comment/:post_id/:comment_id
// @desc         Delete comment
// @access       private
router.delete('/comment/:post_id/:comment_id', auth, postController.deleteComment)
module.exports = router;
