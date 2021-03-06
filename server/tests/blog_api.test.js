const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('secret', 10);
  const user = new User({ username: 'root', passwordHash });
  await user.save();
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const promises = helper.initialBlogs.map(async (blog) => {
    const user = await User.findOne({});
    return new Blog({ ...blog, user: user._id }).save();
  });
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

  test('all blogs have a user property', async () => {
    const response = await api.get('/api/blogs');
    response.body.map((blog) => {
      expect(blog.user).toBeDefined();
    });
  });
});

describe('addition of a new blog', () => {
  let token;
  let userId;
  beforeAll(async () => {
    const users = await helper.usersInDb();
    const userForToken = { username: users[0].username, id: users[0].id };
    userId = userForToken.id;
    token = jwt.sign(userForToken, process.env.SECRET);
  });

  test('succeeds with valid data', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test',
        author: 'test',
        url: 'http://test.com',
        likes: 5,
      })
      .expect(201);

    expect(response.body.user).toEqual(userId);

    const blogs = await helper.blogsinDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('defaults likes to 0 if not provided', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test',
        author: 'test',
        url: 'http://test.com',
      });
    expect(response.body.likes).toEqual(0);
  });

  test('fails with status code 400 if data is invalid', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        author: 'test',
        likes: 5,
      })
      .expect(400);
  });

  test('fails with status code 401 if token is not provided', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'Test',
        author: 'test',
        url: 'http://test.com',
      })
      .expect(401);
  });
});

describe('deleting a blog', () => {
  let token;
  let userId;
  beforeAll(async () => {
    const users = await helper.usersInDb();
    const userForToken = { username: users[0].username, id: users[0].id };
    userId = userForToken.id;
    token = jwt.sign(userForToken, process.env.SECRET);
  });

  test('succeeds with a valid ID', async () => {
    const blogsAtStart = await helper.blogsinDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
    const blogsAtEnd = await helper.blogsinDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });

  test('with non-existing ID returns status code 204', async () => {
    const nonExistingId = helper.nonExistingId();
    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });

  test('with malformatted ID returns status code 400', async () => {
    await api
      .delete('/api/blogs/jlfhs')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });

  test('with missing token returns status code 401', async () => {
    const blogsAtStart = await helper.blogsinDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);
  });

  test('with invalid token returns status code 401', async () => {
    const blogsAtStart = await helper.blogsinDb();
    const blogToDelete = blogsAtStart[0];
    const invalidToken = helper.invalidUserToken();

    const response = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401);
    const errorMessage = expect.stringMatching(/Missing or invalid token/);
    expect(response.body.error).toEqual(errorMessage);
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
