const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//users have many posts & comments
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});


//posts belong to users and have many comments
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

//Comments belong to posts & to users
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });




module.exports = {
    User,
    Post,
    Comment,
};