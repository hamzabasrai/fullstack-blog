import React from 'react';
import { css } from 'emotion';

import Layout from '../components/Layout';

const User = ({ user }) => {
  return !user ? null : (
    <Layout>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          margin: 5px 0;
        `}>
        <h1
          className={css`
            margin-bottom: 0;
          `}>
          {user.name}
        </h1>
        <h2
          className={css`
            margin: 0;
          `}>
          Submitted Blogs
        </h2>
        {user.blogs.length === 0 ? (
          <p>No blogs submitted</p>
        ) : (
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default User;
