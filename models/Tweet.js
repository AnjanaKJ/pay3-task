const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid')

const tweetSchema = new Schema(
  {
    tweetId: {
      type: String,
      default: shortid.generate
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
    replies: [{
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
    }],
    photo: {
      data: Buffer,
      contentType: String
    }
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
