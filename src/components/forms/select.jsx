import React from "react";

const Select = ({ value = "", onChange, options = [], ...rest }) => {
  return (
    <select className="select-level" value={value} onChange={onChange}>
      {options.map(({label,key}) => (
        <option value = {key} key={key}>{label}</option>
      ))}
    </select>
  );
};

export default Select;
