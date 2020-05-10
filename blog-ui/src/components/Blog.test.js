import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

window.localStorage.setItem(
  'currentUser',
  JSON.stringify({ username: 'hbasrai' })
);

const blog = {
  likes: 15,
  title: 'My First Blog',
  author: 'Hamza Basrai',
  url: 'https://hamzabasrai.com',
  user: {
    username: 'hbasrai',
    name: 'Hamza',
    id: '5eac88fd174001015befad0f',
  },
  id: '5eb5808cf71468048ea46d12',
};

test('renders blog title & author but no details', () => {
  const component = render(<Blog blog={blog} />);

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const details = component.container.querySelector('#details');

  expect(title).toHaveTextContent('My First Blog');
  expect(author).toHaveTextContent('Hamza Basrai');
  expect(details).toHaveStyle('display: none');
});

test('renders details when button is toggled', () => {
  const component = render(<Blog blog={blog} />);

  const toggleDetails = component.container.querySelector('#toggle-details');
  const details = component.container.querySelector('#details');

  expect(details).toHaveStyle('display: none');
  fireEvent.click(toggleDetails);
  expect(details).not.toHaveStyle('display: none');
});

test('event handler is called when like button is clicked', () => {
  const updateBlog = jest.fn();
  const component = render(<Blog blog={blog} updateBlog={updateBlog} />);

  const likeButton = component.container.querySelector('#like-button');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(updateBlog.mock.calls).toHaveLength(2);
});
