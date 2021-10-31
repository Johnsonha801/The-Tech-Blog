const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User can have zero or many blog posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// Post can have one and only one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Post can have zero or many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// User can have zero or many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// Comment can have one and only one Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// Comment can have one and only one User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post, Comment };