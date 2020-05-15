import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const setField = (value) => {
    setValue(value);
  };

  return [
    {
      type,
      value,
      onChange,
    },
    setField,
  ];
};
