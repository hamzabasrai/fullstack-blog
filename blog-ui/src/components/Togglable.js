import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, ref) => {
  const [isVisible, setVisible] = useState(false);

  const hideWhenVisible = { display: isVisible ? 'none' : '' };
  const showWhenVisible = { display: isVisible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!isVisible);
  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="toggle-button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
