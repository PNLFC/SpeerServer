const express = require('express');
const Tweet = require('../models/tweet');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tweet',auth, async (req,res) => {
    try{
        const tweet = new Tweet({
            ...req.body,
            owner: req.user._id})
        await tweet.save()
        res.status(201).send(tweet)
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/tweet/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => update === 'tweet')
    if(!isValidOperation){
        return res.status(404).send('error: Invalid update')
    }
    try{
        const tweet = await Tweet.findOne({_id:req.params.id, owner:req.user._id})
        updates.forEach((update) => tweet[update] = req.body[update])
        await tweet.save()
        if(!tweet){
            return res.status(404).send()
        }
        res.status(200).send(tweet)
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete('/tweet/:id', auth, async(req,res) => {
    try{
        const tweet = await Tweet.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if (!tweet){
            return res.status(401).send()
        }
        res.send(tweet)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tweet/:id', auth, async (req,res) => {
    const _id = req.params.id
    try{
        const tweet = await Tweet.findOne({_id, owner: req.user._id})
        if (!tweet){
            res.status(404).send()
        }
        res.send(tweet)
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/tweet/like/:id', auth, async(req, res) => {
    const {likes_id} = req.body
    const _id = req.params.id
    try{
        const tweet = await Tweet.findOneAndUpdate(
            {_id: _id},
            {$push: {likes: likes_id }},{
                new: true
            }
        )
        res.status(200).send(tweet)
    }catch(e){
        res.status(404).send(e)
    }
})

router.post('/tweet/unlike/:id', auth, async(req, res) => {
    const {likes_id} = req.body
    const _id = req.params.id
    try{
        const tweet  = await Tweet.findOneAndUpdate(
            {_id},
            {$pull: {likes: likes_id }},{
                new: true
            }
        )
        res.status(200).send(tweet)
    }catch(e){
        res.status(404).send(e)
    }
})

router.post('/tweet/retweet/:id', auth, async(req, res) => {
    const {retweet_id} = req.body
    const _id = req.params.id
    try{
        const tweet = await Tweet.findOneAndUpdate(
            {_id},
            {$push: {retweets: retweet_id }},{
                new: true
            }
        )
        res.status(200).send(tweet)
    }catch(e){
        res.status(404).send(e)
    }
})

module.exports = router;