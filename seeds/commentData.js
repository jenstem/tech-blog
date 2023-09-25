const { Comment } = require('../models');

const commentData = [
    {
        "body":  "Comment 1.",
        "user_id": 1,
        "blog_id": 1
    },

    {
        "body":  "Notifications whenever a concert is playing in your area.",
        "user_id": 2,
        "blog_id": 2
    },

    {
        "body":  "A concert is playing in your area.",
        "user_id": 3,
        "blog_id": 3
    },

    {
        "body":  "Notifications sent.",
        "user_id": 4,
        "blog_id": 4
    },

    {
        "body":  "A mobile concert is playing in your area.",
        "user_id": 5,
        "blog_id": 5
    }
];

const seedAllComments = () => Comment.bulkCreate(commentData);

module.exports = seedAllComments;