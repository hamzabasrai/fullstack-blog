import React from 'react';
import { css } from 'emotion';

import Layout from '../components/Layout';

const Users = () => {
  return (
    <Layout>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          margin: 5px 0;
        `}>
        <h1
          className={css`
            margin: 0;
          `}>
          Users
        </h1>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Number of Blogs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hamza</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Users;
