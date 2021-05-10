const request = require('supertest');
const api = require('../src/api');
const {setupDatabase,
    userOneId,
    userOne,
    userTwoId,
    chatroomId
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('should make a new chatroom for userOne', async () => {
    const response = await request(api).post('/chatroom')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        participants: [userOneId, userTwoId],
        chat: "Howdy"
    })
    .expect(201)
    expect(response.body).not.toBeNull()
    expect(response.body.chats.length).toEqual(1)
})

test('userOne should add chat to Chatroom', async () => {
    const response = await request(api).post(`/chatroom/${chatroomId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ message: "I'm good"})
    .expect(201)
    expect(response.body).not.toBeNull()
    expect(response.body.chats.length).toEqual(2)
})