const Tweet = require('../models/Tweet');

const likeTweet = async (req, res) => {
  try {
    const tweetId  = req.params.tweetId;
    const userId = req.user._id;

    const tweet = await Tweet.findOne({tweetId});
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }


    if (tweet.likes.includes(userId)) {
      return res.status(200).json({ message: 'You have already liked the tweet.' });
    }

    tweet.likes.push(userId);
    await tweet.save();


    res.status(200).json({ message: 'Liked successfully' });
  } catch (error) {
    console.error('Error liking tweet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const unlikeTweet = async (req, res) => {
  try {
    const tweetId  = req.params.tweetId;
    const userId = req.user._id;

    const tweet = await Tweet.findOne({tweetId});
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    tweet.likes.pull(userId);
    await tweet.save();


    res.status(200).json({ message: 'Unliked successfully' });
  } catch (error) {
    console.error('Error unliking tweet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
    likeTweet,
    unlikeTweet
  };
