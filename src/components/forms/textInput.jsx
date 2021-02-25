import React from "react";

const TextInput = ({
  value = "",
  onChange,
  placeholder = "",
  isError = false,
  message = '',
  input_class = 'input-name',
  ...rest
}) => {
  return (
    <div
      className="flex_column"
      style={{ marginBottom: 20}}
    >
      <input
        className={input_class}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {isError && <label className="input_error">{message}</label>}
    </div>
  );
};

export default TextInput;
