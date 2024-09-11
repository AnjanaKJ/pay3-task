const express = require('express');
const {authenticateToken} = require('../middlewares/authMiddleware');
const { unfollowUser } = require('../controllers/unfollowController');

const router = express.Router();

router.delete('/:userId', authenticateToken, unfollowUser);

module.exports = router;
