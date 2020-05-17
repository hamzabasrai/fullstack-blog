import React from 'react';
import { css } from 'emotion';

import Layout from '../components/Layout';
import { useSelector } from 'react-redux';

const Users = () => {
  const users = useSelector((state) => state.users.allUsers);

  return (
    <Layout>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          margin: 5px 0;
        `}>
        <h1>Users</h1>
        <table
          className={css`
            border-collapse: collapse;
            td,
            th {
              border: 1px solid #999;
              padding: 0.5rem;
              text-align: left;
            }
          `}>
          <thead>
            <tr>
              <th>User</th>
              <th>Blogs Submitted</th>
              <th>Total Likes</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.blogs.length}</td>
                  <td>
                    {user.blogs.reduce((sum, blog) => (sum += blog.likes), 0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Users;
