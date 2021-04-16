import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import './Login.css';
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
    <main class="Login">
      <h3>Spicy Adventures Await</h3>
      <label htmlFor="email">Your Email</label>
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
        <label htmlFor="password">Your Password</label>
 
        <input
          type="password"
          autoComplete="off"
          id="password"
          value={loginData.pw}
          name="pw"
          onChange={handleChange}
          required
        />
          <Link id='signup' className="btn red" to="/">
              Don't have an account? Sign up
          </Link>
        
        <button className="btn green">Log In</button>
      </form>
      <Link className="btn red" id='cancel' to="/">
        Go Back
      </Link>
    </main>
  );
}

