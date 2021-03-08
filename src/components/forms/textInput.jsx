import React from "react";

const TextInput = ({
  value = "",
  onChange,
  placeholder = "",
  isError = false,
  message = "",
  name = null,
  input_class = "input-name",
  type = "text",
  ...rest
}) => {
  return (
    <div
      className="flex_column"
      style={{
        marginBottom: 25,
        alignItems: input_class === "input-email" ? "flex-start" : "center",
      }}
    >
      {name && <label className="input-label">{name}</label>}
      <input
        className={input_class}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
      {isError && <label className="input_error">{message}</label>}
    </div>
  );
};

export default TextInput;
