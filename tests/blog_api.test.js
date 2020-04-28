const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const promises = helper.initialBlogs.map((blog) => new Blog(blog).save());
  await Promise.all(promises);
});

describe('GET /api/blogs', () => {
  test('returns blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('returns correct number of blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  test('returns ID property on every blog', async () => {
    const response = await api.get('/api/blogs');
    response.body.map((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('POST /api/blogs', () => {
  test('successfully creates new blog', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'Test',
        author: 'test',
        url: 'http://test.com',
        likes: 5,
      })
      .expect(201);
    const blogsInDb = await helper.blogsinDb();
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('defaults likes to 0 if not provided', async () => {
    const response = await api.post('/api/blogs').send({
      title: 'Test',
      author: 'test',
      url: 'http://test.com',
    });
    expect(response.body.likes).toEqual(0);
  });

  test('400 Bad Request if title and url are missing', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'test',
        likes: 5,
      })
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
