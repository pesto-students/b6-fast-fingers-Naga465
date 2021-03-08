import React, { useState } from "react";
import fetcher from "../../api";
import TextInput from "../forms/textInput";

function Home(props) {
  const [username, setUsername] = useState({
    value: "",
    isError: false,
    message: "",
  });
  const [password, setPassword] = useState({
    value: "",
    isError: false,
    message: "",
  });

  const _onSubmit = async () => {
    if (!username.value || !password.value) {
      if (!username.value)
        setUsername({
          ...username,
          isError: true,
          message: "username required",
        });
      if (!password.value)
        setPassword({
          ...password,
          isError: true,
          message: "password required",
        });
      return;
    }
    const headers = { method: "POST", body: { username :username.value, password :password.value} };
    const res = await fetcher("/login", headers);
    if (res) {
      props.updateStorage(res.data);
    }
  };

  const _usernameChange = ({ target: { value } }) => {
    if (!value) {
      setUsername((state) => ({
        ...state,
        value,
        isError: true,
        message: "username required",
      }));
      return;
    }
    setUsername({ value });
  };
  const _passwordChange = ({ target: { value } }) => {
    if (!value) {
      setPassword((state) => ({
        ...state,
        value,
        isError: true,
        message: "password required",
      }));
      return;
    }
    setPassword({ value });
  };

  return (
    <div style={{ alignItems: "center" }} className="main_container">
      <div className="flex_column">
        <div>
          <TextInput
            input_class="input-email"
            onChange={_usernameChange}
            name="Username"
            value={username.value}
            isError={username.isError}
            message={username.message}
          ></TextInput>
          <TextInput
            input_class="input-email"
            onChange={_passwordChange}
            type="password"
            name="Password"
            value={password.value}
            isError={password.isError}
            message={password.message}
          ></TextInput>
        </div>
        <button onClick={_onSubmit} className="submit-btn">
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default Home;
