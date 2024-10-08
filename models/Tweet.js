const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid')

const tweetSchema = new Schema(
  {
    tweetId: {
      type: String,
      unique: true,
      default: shortid.generate
    },
    originalTweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    default: null,
    },
    content: {
      type: String,
      required: [true, 'Tweet content is required'],
      maxlength: [280, 'Tweet content should not exceed 280 characters'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    retweets: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    noOfRetweets: {
      type: Number,
      default: 0,
    },
    photo: {
      url: {
        type: String
    }
  },
    comments: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
