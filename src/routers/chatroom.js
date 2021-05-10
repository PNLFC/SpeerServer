const express = require('express');
const { ChatRoom, Chat } = require('../models/chatroom');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/chatroom',auth, async (req,res) => {
    const {participants, chat} = req.body
    try{
        const chats = new Chat({message: chat, sender: req.user._id})
        console.log(chats)
        const chatRoom = new ChatRoom({
            participants: participants,
            chats: [chats]
        })
        await chatRoom.save()
        res.status(201).send(chatRoom)
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/chatroom/:id', auth, async (req,res) => {
    const { message } = req.body
    try {
      let chat = new Chat({
        message: message,
        sender: req.user._id
      })
      await chat.save()
      let chatRoom = await ChatRoom.findOneAndUpdate(
        {_id: req.params.id},
        {$push: {chats: chat}},{
            new: true
        }
      )
      await chatRoom.save()
      res.status(201).send(chatRoom)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router;