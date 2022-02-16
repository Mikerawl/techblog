const { User } = require('../models');

const userSeed = [
    {
        id: 1,
        firstname: 'bob',
        lastname: 'smith',
        email: 'bob@bob.com',
        password: 'password',
    },
    {
        id: 2,
        firstname: 'sally',
        lastname: 'jones',
        email: 'sally@sally.com',
        password: 'password',
    },
    {
        id: 3,
        firstname: 'john',
        lastname: 'johns',
        email: 'john@john.com',
        password: 'password',
    },
];


const seedUser = () => User.bulkCreate(userSeed);

module.exports = seedUser;