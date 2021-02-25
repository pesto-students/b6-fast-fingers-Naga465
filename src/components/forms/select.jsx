import React from "react";

const Select = ({ value = "", onChange, options = [], ...rest }) => {
  return (
    <select className="select-level" value={value} onChange={onChange}>
      {options.map((ele) => (
        <option key={ele}>{ele}</option>
      ))}
    </select>
  );
};

export default Select;
