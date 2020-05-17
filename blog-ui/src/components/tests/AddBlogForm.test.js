import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import AddBlogForm from '../AddBlogForm';

test('event handler is called when correct data form is submitted', () => {
  const createBlog = jest.fn();
  const component = render(<AddBlogForm createBlog={createBlog} />);

  const form = component.container.querySelector('form');
  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');

  fireEvent.change(title, { target: { value: 'Test Blog' } });
  fireEvent.change(author, { target: { value: 'Tester McTesterson' } });
  fireEvent.change(url, { target: { value: 'https://testing.com' } });
  fireEvent.submit(form);

  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Test Blog',
    author: 'Tester McTesterson',
    url: 'https://testing.com',
  });
});
