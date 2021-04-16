import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import authService from '../../services/authService';
import { useForm } from '../../hooks/useForm';

export default function LoginPage(props) {
  const history = useHistory();
  const [loginData, handleChange] = useForm({
    email: "",
    pw: "",
  });

  const handleSubmit = async (e) => {
    const { handleSignupOrLogin } = props;
    e.preventDefault();
    try {
      await authService.login(loginData);
      handleSignupOrLogin();
      history.push("/");
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      alert(err.message);
    }
  };

  return (
    <main className="Login">
      <h3>Log In</h3>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          id="email"
          value={loginData.email}
          name="email"
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="password"
          autoComplete="off"
          id="password"
          value={loginData.pw}
          name="pw"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <button className="btn green">Log In</button>
        <Link className="btn red" to="/">
          Cancel
        </Link>
      </form>
    </main>
  );
}

