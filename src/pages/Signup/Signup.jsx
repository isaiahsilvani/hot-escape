import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import authService from "../../services/authService";
import { useForm } from '../../hooks/useForm'

export default function SignupForm(props) {
  const history = useHistory();
  const [message, setMessage] = useState('')
  const [invalidForm, setValidForm] = useState(true)
  const formRef = useRef();
  const [formData, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  })

  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
    setMessage('');
  }, [formData]);

  const handleSubmit = async (e) => {
    const { handleSignupOrLogin } = props;
    e.preventDefault();
    try {
      if(formData.password !== formData.passwordConf)
        throw Error("Passwords do not match")
      await authService.signup(formData);
      handleSignupOrLogin();
      history.push("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <div>
        <h3>Sign Up</h3>
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            id="name"
            value={formData.name}
            name="name"
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            autoComplete="off"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            id="confirm"
            value={formData.passwordConf}
            name="passwordConf"
            onChange={handleChange}
            required
          />
          <label htmlFor="confirm">Confirm Password</label>
          <button disabled={invalidForm}>Sign Up</button>
          <Link to="/">Cancel</Link>
        </form>
      </div>
      <p>{message}</p>
    </main>
  );
}
