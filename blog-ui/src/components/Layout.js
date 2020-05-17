import React from 'react';
import Header from './Header';
import { css } from 'emotion';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div
        className={css`
          margin: 15px 0;
          padding: 10px;
        `}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
