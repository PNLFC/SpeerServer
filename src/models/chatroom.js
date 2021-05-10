const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const chatRoomSchema = new mongoose.Schema({
    title: {
        type: String
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],
    chats: [chatSchema]
});


const Chat = mongoose.model('Chat', chatSchema);
const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = { Chat, ChatRoom };