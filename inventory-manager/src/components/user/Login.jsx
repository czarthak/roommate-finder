import React, { useState } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
export const Login = ({setToken}) => {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(pass);
    Axios.post("http://localhost:8080/auth/login", {
      email: email,
      password: pass,
    }).then((response) => {
      // console.log(typeof(response));
      setToken(response);
      console.log(response.data);
    });
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">PID</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
export default Login;
