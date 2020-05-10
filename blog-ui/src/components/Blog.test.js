import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
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
