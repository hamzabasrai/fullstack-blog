const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('users are returned as JSON', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('correct number of users is returned', async () => {
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(1);
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'hbasrai',
      name: 'Hamza Basrai',
      password: 'supersecretpassword',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with invalid username', async () => {
    const newUser = {
      username: 'h',
      name: 'Hamza Basrai',
      password: 'supersecretpassword',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    const errorMessage = expect.stringMatching(/Path `username`/);
    expect(response.body.error).toEqual(errorMessage);
  });

  test('creation fails with non-unique username', async () => {
    const newUser = {
      username: 'root',
      name: 'Hamza Basrai',
      password: 'supersecretpassword',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    const errorMessage = expect.stringMatching(
      /expected `username` to be unique/
    );
    expect(response.body.error).toEqual(errorMessage);
  });

  test('creation fails with invalid password', async () => {
    const newUser = {
      username: 'hbasrai',
      name: 'Hamza Basrai',
      password: 'su',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    const errorMessage = expect.stringMatching(
      /Password must be minimum 3 characters long/
    );
    expect(response.body.error).toEqual(errorMessage);
  });

  test('invalid user is not created in db', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'h',
      name: 'Hamza Basrai',
      password: 'supersecretpassword',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
