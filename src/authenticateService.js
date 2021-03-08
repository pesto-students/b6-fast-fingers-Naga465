import { useEffect, useState } from "react";
import React from "react";

export const initState = {
  token: null,
};

export function getUser(key) {
  if (!key) throw Error(`Provide Storage key`);
  return JSON.parse(localStorage.getItem(key)) || initState;
}

function useStorage(props) {
  const [storage, setStorage] = useState(() => {
    let item = JSON.parse(localStorage.getItem("user"));
    return item ? item : initState;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(storage));
  }, [storage]);

  return function (Component) {
    return <Component {...props} {...storage} updateStorage={setStorage} />;
  };
}

export default useStorage;
