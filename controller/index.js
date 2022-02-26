const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const htmlRoutes = require('./htmlRoutes');

router.use('/auth', authRoutes);
router.use('/', htmlRoutes);

module.exports = router;
