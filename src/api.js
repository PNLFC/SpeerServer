require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const tweetRouter = require('./routers/tweet');
const chatroomRouter = require('./routers/chatroom');

const api = express()

api.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
api.use(express.json());
api.use(userRouter);
api.use(tweetRouter);
api.use(chatroomRouter);

module.exports = api;