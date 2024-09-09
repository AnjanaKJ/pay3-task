const Tweet = require('../models/Tweet');
const User = require('../models/User');

const createTweet = async (req, res) => {
  try {
    console.log(req.body)
    const { content} = req.body;
    const photo = req.file;
    const userId = req.user._id;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const tweetData = {
      content,
      author: userId,
    };

    if (photo) {
      tweetData.photo = {
        data: photo.buffer,
        contentType: photo.contentType,
      };
    }

    const tweet = new Tweet(tweetData);
    await tweet.save();

    const user = await User.findById(userId);
    user.tweets.push(tweet._id);
    await user.save();

    res.status(201).json(tweet);
    console.log(`Tweet created by user ${userId}`);
  } catch (error) {
    console.error('Error creating tweet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().populate('author', 'username');
    res.status(200).json(tweets);
    console.log('Retrieved all tweets');
  } catch (error) {
    console.error('Error retrieving tweets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getTweetsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('tweets');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.tweets);
  } catch (error) {
    console.error('Error fetching user tweets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTweetsByTweetId = async (req, res) => {
  try {
    const {tweetId}  = req.params;
    if(!tweetId){
       return res.status(400).json({ error: 'Tweet ID is required' });
    }
    const tweets = await Tweet.find({ tweetId });
    if (!tweets.length) {
      return res.status(404).json({ message: 'No tweet found' });
    }

    res.status(200).json(tweets);
    console.log(`Retrieved tweets with id ${tweetId}`);
  } catch (error) {
    console.error('Error retrieving tweet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteTweet = async (req, res) => {
  try {
    const { tweetId } = req.params;
    const userId = req.user._id;


    const tweet = await Tweet.findOne({tweetId});

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    if (tweet.author.toString() !== userId.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this tweet' });
    }

    await Tweet.deleteOne({tweetId });

    res.status(200).json({ message: 'Tweet deleted successfully' });
    console.log(`Tweet deleted with ID ${tweetId}`);
  } catch (error) {
    console.error('Error deleting tweet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createTweet,
  getAllTweets,
  getTweetsByUser,
  getTweetsByTweetId,
  deleteTweet
};
