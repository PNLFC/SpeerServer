const request = require('supertest');
const api = require('../src/api');
const {setupDatabase, userOneId, userOne} = require('./fixtures/db');

beforeEach(setupDatabase);


test('should signup a new user', async () => {
    const response = await request(api).post('/users').send({
        username: 'Nwodo Charles',
        password: 'nigeria123'
    }).expect(201)
})

test('should login existing user', async () => {
    const response = await request(api).post('/users/login').send({
        username: userOne.username,
        password: userOne.password
    }).expect(200)
})

test('should not login non-existent user', async () => {
    await request(api).post('/users/login').send({
        username: userOne.username,
        password: 'thisisnotmypassword'
    }).expect(400)
})
