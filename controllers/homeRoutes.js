const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { findAll } = require('../models/User');

// GET all blog posts
router.get("/", async (req, res) => {
  const blogData = await Blog.findAll({
    include:
      User
  });
  const blogs = blogData.map((blog) =>
    blog.get({ plain: true })
  );
  res.render("homepage", { blogs, loggedIn: req.session.logged_in });
})

// Dashboard
router.get("/dashboard", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/');
    return
  }
  const blogData = await Blog.findAll({ where: { user_id: req.session.user_id } });
  const blogs = blogData.map((blog) =>
    blog.get({ plaint: true })
  );
  res.render("dashboard", { blogs, loggedIn: req.session.logged_in });
})

// GET single blog post by id
router.get("/blogs/:id", async (req, res) => {
  let id = req.params.id;
  const blogData = await Blog.findByPk(id, { include: [User, { model: Comment, include: User }] });
  const blog = blogData.get({ plain: true });

  blog.comments = blog.comments.map(comment => ({
    ...comment,
    can_delete: comment.user_id === req.session.user_id
  }))
  res.render("singleBlogPost", { blog, loggedIn: req.session.logged_in });
})

// Edit blog post
router.get("/blogs/:id/edit", withAuth, async (req, res) => {
  let id = req.params.id;
  const blogData = await Blog.findByPk(id);
  const blog = blogData.get({ plain: true });

  res.render("editBlog", { blog, loggedIn: req.session.logged_in });
})

// Login Page
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Signup Page
router.get('/signup', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
