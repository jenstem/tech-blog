const router = require('express').Router();
const { Comment } = require('../../models');
const sequelize = require("../../config/connection");
const withAuth = require('../../utils/auth');

// GET all comments
router.get("/", async (req, res) => {
  await Comment.findAll()
    .then((commentData) => res.json(commentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
})

// POST a new comment
router.post("/", withAuth, async (req, res) => {
  if (req.session) {
    console.log(req.body.body, req.body.blog_id);
    await Comment.create({
      body: req.body.body,
      blog_id: req.body.blog_id,
      user_id: req.session.user_id,
    })
      .then((commentData) => res.json(commentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// Delete a comment
router.delete("/:id", withAuth, async (req, res) => {
  await Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((commentData) => {
      if (!commentData) {
        res.status(404).json({ message: "No comment with that id." });
        return;
      }
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
