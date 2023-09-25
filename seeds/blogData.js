const { Blog } = require('../models');

const blogData = [
    {
        "title": "Music Near Me",
        "user_id": 1,
        "post": "A mobile app that will send you notifications whenever a concert is playing in your area.",
    },

    {
        "title": "The Ultimate Tech Quiz",
        "user_id": 2,
        "post": "A web app that will give users 10 new technical questions each day and track their progress in things like programming, cybersecurity, database architecture, and more!",
    },

    {
        "title": "Roll 'Em Up",
        "user_id": 3,
        "post": "A game for Windows and macOS where players move a ball through a series of increasingly challenging mazes.",
    },

    {
        "title": "The Ultimate Tech Quiz 2",
        "user_id": 2,
        "post": "A web app that will give users 10 new technical questions each day and track their progress in things like programming, cybersecurity, database architecture, and more!",
    },

    {
        "title": "Roll 'Em Up 2",
        "user_id": 3,
        "post": "A game for Windows and macOS where players move a ball through a series of increasingly challenging mazes.",
    }
];

const seedAllPosts = () => Blog.bulkCreate(blogData);

module.exports = seedAllPosts;