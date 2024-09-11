const express = require('express');
const {authenticateToken} = require('../middlewares/authMiddleware');
const { unlikeTweet } = require('../controllers/likeAndUnlikeController');

const router = express.Router();

router.delete('/:tweetId', authenticateToken, unlikeTweet );

module.exports = router;
