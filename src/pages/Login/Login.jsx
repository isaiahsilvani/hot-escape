import React from "react";
import { Link, useHistory } from "react-router-dom";
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
    <div className='whiteBox'>
      <div className="userForm">
      <h1>Login</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        
        <label htmlFor="email">Email: 
        <input
          type="text"
          autoComplete="off"
          value={loginData.email}
          name="email"
          onChange={handleChange}
          required
        /></label>
        <label htmlFor="password">Password: 
        <input
          type="password"
          autoComplete="off"
          value={loginData.pw}
          name="pw"
          onChange={handleChange}
          required
        /></label>
        <button type="submit" className="btn green">Log In</button>
        <Link to="/signup">
            Don't have an account? Sign up
        </Link>
      </form>
      </div>
    </div>
  );
}

