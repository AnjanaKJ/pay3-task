const express = require('express');
const {authenticateToken} = require('../middlewares/authMiddleware');
const { likeTweet } = require('../controllers/likeAndUnlikeController');

const router = express.Router();

router.post('/:tweetId', authenticateToken, likeTweet );

module.exports = router;
