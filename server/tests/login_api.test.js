const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('secret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
});

describe('when there is one user in the db', () => {
  test('login succeeds with valid credentials', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.token).toBeDefined();
  });

  test('login fails with invalid credentials', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'garbage' })
      .expect(401);

    const errorMessage = expect.stringMatching(/Invalid username or password/);
    expect(response.body.error).toEqual(errorMessage);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
