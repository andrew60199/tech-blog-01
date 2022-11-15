const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')

// Associations
User.hasMany(Post)
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Post.hasMany(Comment)
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

module.exports = { User, Post, Comment }