const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    tweet: {
        type: String,
        default: false
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    retweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

tweetSchema.virtual('likeList', {
    ref: 'User',
    localField: '_id',
    foreignField: 'likes'
});

tweetSchema.virtual('retweetList', {
    ref: 'User',
    localField: '_id',
    foreignField: 'retweets'
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;