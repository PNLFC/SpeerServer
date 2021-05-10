const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Tweet = require('../../src/models/tweet');
const {ChatRoom, Chat } = require('../../src/models/chatroom');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    username : 'Nwodo Tochukwu',
    password: 'nigeria123',
    tokens:[{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    username : 'Andrew Ngige',
    password: 'random321',
    tokens:[{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
};

const tweetOneId = new mongoose.Types.ObjectId();
const tweetOne = {
    _id: tweetOneId,
    tweet: "Hello Guys",
    owner: userOneId
};

const tweetTwo = {
    _id: new mongoose.Types.ObjectId(),
    tweet: "Amazing!",
    likes: [userTwoId],
    owner: userTwoId
};

const tweetThree = {
    _id: new mongoose.Types.ObjectId(),
    tweet: "Luna is a good girl",
    owner: userOneId
};

const chatOne = {
    _id: new mongoose.Types.ObjectId(),
    message: 'Hello Andrew',
    sender: userOneId
}

const chatroomId = new mongoose.Types.ObjectId();
const chatroom = {
    _id: chatroomId,
    title:'Soccer lads',
    participants: [userOneId, userTwoId],
    chats: chatOne
};


const setupDatabase = async () => {
    await User.deleteMany({})
    await Tweet.deleteMany({})
    await ChatRoom.deleteMany({})
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Tweet(tweetOne).save()
    await new Tweet(tweetTwo).save()
    await new Tweet(tweetThree).save()
    await new ChatRoom(chatroom).save()
};

module.exports = {
    setupDatabase,
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    tweetOneId,
    tweetOne,
    tweetTwo,
    tweetThree,
    chatroomId
}