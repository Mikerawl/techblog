const { Post } = require('../models/');

console.log("post")

const postSeed = [
    {
        id: 1,
        title: 'Post 1.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        user_id: 1,
        created: 'February 10 2022 09:00:00',
    },
    {
        id: 2,
        title: 'Post 2.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        user_id: 2,
        created: 'February 10 2022 09:00:00',
    },
    {
        id: 3,
        title: 'Post 3.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        user_id: 3,
        created: 'February 10, 2022 09:00:00',
    },
];

const seedPost = () => Post.bulkCreate(postSeed);

module.exports = seedPost;