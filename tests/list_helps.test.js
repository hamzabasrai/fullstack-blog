const listHelper = require('../utils/list_helper');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const listWithMultipleBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Ada Lovelace',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 8,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Alan Turing',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 19,
    __v: 0,
  },
];

describe('total likes', () => {
  test('when list has only one blog equals number of likes', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list is empty equals zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has multiple blogs equals correct sum', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(36);
  });
});

describe('favouriteBlog', () => {
  test('when list is empty', () => {
    const result = listHelper.favouriteBlog([]);
    expect(result).toEqual({});
  });

  test('when list has one blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('when list has multiple blogs', () => {
    const result = listHelper.favouriteBlog(listWithMultipleBlogs);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Alan Turing',
      likes: 19,
    });
  });
});

describe('mostBlogs', () => {
  test('when list is empty', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual({});
  });

  test('when list has one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  });

  test('when list has multiple blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  });
});
