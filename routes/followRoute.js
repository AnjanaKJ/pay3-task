const express = require('express');
const {authenticateToken} = require('../middlewares/authMiddleware');
const { followUser } = require('../controllers/followController');

const router = express.Router();

router.post('/:userId', authenticateToken, followUser);

module.exports = router;
