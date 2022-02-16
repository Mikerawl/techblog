const { Comment } = require('../models');

const commentSeed = [
    {
        id: 1,
        comment: 'Comment 1.',
        post_id: 1,
        user_id: 1,
        created: 'February 10 2022 09:00:00',
    },
    {
        id: 2,
        comment: 'Comment 2',
        post_id: 2,
        user_id: 2,
        created: 'February 10 2022 09:00:00',
    },
    {
        id: 3,
        comment: 'Comment 3',
        post_id: 3,
        user_id: 3,
        created: 'February 10 2022 09:00:00',
    },
];

const seedComment = () => Comment.bulkCreate(commentSeed);

module.exports = seedComment;