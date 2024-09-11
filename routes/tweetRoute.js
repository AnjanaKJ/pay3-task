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
  retweetTweet,
  addComment
} = require('../controllers/tweetController');

router.post('/create', authenticateToken,upload.single('photo'), createTweet);
router.get('', getAllTweets);
router.get('/user/:userId', getTweetsByUser);
router.get('/tweetId/:tweetId', getTweetsByTweetId);
router.delete('/delete/:tweetId', authenticateToken, deleteTweet);
router.post('/:tweetId/retweet', authenticateToken, retweetTweet);
router.post('/comment/:tweetId', authenticateToken, addComment);

module.exports = router;