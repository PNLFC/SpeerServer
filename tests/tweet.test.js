const request = require('supertest');
const api = require('../src/api');
const Tweet = require('../src/models/tweet');
const {setupDatabase,
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    tweetOneId,
    tweetTwoId
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('should make a new tweet for userOne', async () => {
    const response = await request(api).post('/tweet')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        tweet: 'Pure water'
    })
    .expect(201)
    const tweetObject = await Tweet.findById(response.body._id)
    expect(tweetObject).not.toBeNull()
    expect(tweetObject.tweet).toEqual('Pure water')
})

test('should get tweet for UserOne', async () => {
    const response = await request(api).get(`/tweet/${tweetOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('should patch tweet for UserOne', async () => {
    const response = await request(api).patch(`/tweet/${tweetOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({tweet: 'Boko haram'})
    .expect(200)
})

test('should delete tweet for UserOne', async () => {
    const response = await request(api).delete(`/tweet/${tweetOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('should post like for tweetOne owned by UserOne sent by UserTwo', async () => {
    const response = await request(api).post(`/tweet/like/${tweetOneId}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({likes_id: userTwoId})
    .expect(200)
    expect(response.body).not.toBeNull()
    expect(response.body.likes.length).toEqual(1)
})

test('should post unlike for tweetOne owned by UserOne sent by UserTwo', async () => {
    const response = await request(api).post(`/tweet/unlike/${tweetOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({likes_id: userTwoId})
    .expect(200)
    expect(response.body).not.toBeNull()
    expect(response.body.retweets.length).toEqual(0)
})

test('should post retweet for tweetOne owned by UserOne sent by UserTwo', async () => {
    const response = await request(api).post(`/tweet/retweet/${tweetOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({retweet_id: userTwoId})
    .expect(200)
    expect(response.body).not.toBeNull()
    expect(response.body.retweets.length).toEqual(1)
})
