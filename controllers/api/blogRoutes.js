const router = require('express').Router();
const { User, Blog } = require('../../models');
const sequelize = require("../../config/connection");
const withAuth = require('../../utils/auth');

// GET all blog posts
router.get("/", async (req, res) => {
  await Blog.findAll({
    include: [{
      model: User,
      attributes: ["username"],
    }]

  }).then((blogData) => res.json(blogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
})

// CREATE a new blog post
router.post("/", withAuth, async (req, res) => {
  await Blog.create({
    title: req.body.title,
    post: req.body.post,
    user_id: req.session.user_id,
  })
    .then((blogData) => res.json(blogData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE blog post
router.put("/:id", withAuth, async (req, res) => {
  console.log(req.body.post);
  await Blog.update({
    title: req.body.title,
    post: req.body.post,
    user_id: req.session.user_id,
  },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((blogData) => {
      if (!blogData) {
        res.status(404).json({ message: "No blog with that id." });
        return;
      }
      res.json(blogData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!blogData) {
      return res.status(404).json({ message: "No blog with that id." });
    }
    return res.status(200).json(blogData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
