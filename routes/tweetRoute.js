const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');
const {
  createTweet,
  getAllTweets,
  getTweetsByUser,
  getTweetsByTweetId,
  deleteTweet,
  retweetTweet
} = require('../controllers/tweetController');

router.post('/create', authenticateToken,upload.single('photo'), createTweet);
router.get('', getAllTweets);
router.get('/user/:userId', getTweetsByUser);
router.get('/tweetId/:tweetId', getTweetsByTweetId);
router.delete('/tweets/:tweetId', authenticateToken, deleteTweet);
router.get('/:tweetId/retweet', authenticateToken, retweetTweet);

module.exports = router;