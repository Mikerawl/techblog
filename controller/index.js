const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');
const authRoutes = require('./authRoutes');

router.use('/', htmlRoutes);
router.use('/auth', authRoutes);
router.use('/api', apiRoutes);


module.exports = router;