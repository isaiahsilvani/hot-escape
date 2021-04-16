import React, {Component, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../hooks/useForm';
import * as attractionAPI from '../../services/attractionService'

export default function AddAttraction(props){
  const history = useHistory();
  const [invalidForm, setValidForm] = useState(true);
  const [state, handleChange]       = useForm({
    name: '',
    location: '',
  })

  const formRef = useRef();

  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(state)
      await attractionAPI.addAttraction(state)
      history.push("/attractions");
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <h1>Add Attraction</h1>
      <form  autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Atrraction's Name</label>
          <input
            className="form-control"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Attraction's Location</label>
          <input
            className="form-control"
            name="location"
            value={ state.location}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn"
          disabled={invalidForm}
        >
          ADD ATTRACTION
        </button>
      </form>
    </>
  );
  
}
