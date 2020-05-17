import React from 'react';
import { css } from 'emotion';

import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';
import BlogList from './BlogList';
import Layout from './Layout';

const Home = () => {
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

export default Home;
