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

describe('when there are some blogs saved', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('all blogs have an ID property', async () => {
    const response = await api.get('/api/blogs');
    response.body.map((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'Test',
        author: 'test',
        url: 'http://test.com',
        likes: 5,
      })
      .expect(201);
    const blogs = await helper.blogsinDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('defaults likes to 0 if not provided', async () => {
    const response = await api.post('/api/blogs').send({
      title: 'Test',
      author: 'test',
      url: 'http://test.com',
    });
    expect(response.body.likes).toEqual(0);
  });

  test('fails with status code 400 if data is invalid', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'test',
        likes: 5,
      })
      .expect(400);
  });
});

describe('deleting a blog', () => {
  test('succeeds with a valid ID', async () => {
    const blogsAtStart = await helper.blogsinDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsinDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });

  test('with non-existing ID returns status code 204', async () => {
    const nonExistingId = helper.nonExistingId();
    await api.delete(`/api/blogs/${nonExistingId}`).expect(204);
  });

  test('with malformatted ID returns status code 400', async () => {
    await api.delete('/api/blogs/jlfhs').expect(400);
  });
});

describe('updating a blog', () => {
  test('succeeds with a valid ID and data', async () => {
    const blogs = await helper.blogsinDb();
    const blogToUpdate = blogs[0];

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ title: 'Test', author: 'test', url: 'http://test.com', likes: 5 })
      .expect(200);

    expect(blogToUpdate).not.toEqual(updatedBlog);
  });

  test('with non-existing ID returns null', async () => {
    const nonExistingId = helper.nonExistingId();
    const response = await api
      .put(`/api/blogs/${nonExistingId}`)
      .send({ title: 'Test', author: 'test', url: 'http://test.com', likes: 5 })
      .expect(200);

    expect(response.body).toEqual(null);
  });

  test('with malformatted ID returns status code 400', async () => {
    await api
      .put('/api/blogs/jlfhs')
      .send({ title: 'Test', author: 'test', url: 'http://test.com', likes: 5 })
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
