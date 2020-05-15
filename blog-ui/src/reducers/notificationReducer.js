const initialState = '';

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;

    case 'CLEAR_NOTIFICATION':
      return '';

    default:
      return state;
  }
};

// Keep reference to last 'setTimeout' call. Used to prevent premature removal of a
// notification when there are multiple setNotification calls in quick succession.
let timeoutID;

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message,
    });

    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    // Show notification for 'duration' in seconds
    timeoutID = setTimeout(
      () => dispatch(clearNotification()),
      duration * 1000
    );
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default notificationReducer;
