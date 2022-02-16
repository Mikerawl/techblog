// model imports
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

console.log("index")

//users have many posts & comments
User.hasMany(Post);
// User.hasMany(Comment);

//posts belong to users and have many comments
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasOne(Comment);

//Comments belong to posts & to users
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
/*
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
*/


module.exports = {
    User,
    Post,
    Comment,
};