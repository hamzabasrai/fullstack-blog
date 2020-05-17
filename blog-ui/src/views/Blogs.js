import React from 'react';
import { css } from 'emotion';

import AddBlogForm from '../components/AddBlogForm';
import Togglable from '../components/Togglable';
import BlogList from '../components/BlogList';
import Layout from '../components/Layout';

const Blogs = () => {
  return (
    <Layout>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          margin: 5px 0;
        `}>
        <Togglable buttonLabel="Add Blog">
          <AddBlogForm />
        </Togglable>
        <BlogList />
      </div>
    </Layout>
  );
};

export default Blogs;
