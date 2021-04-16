import React, {Component, useState, useRef, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';

export default function AddAttraction(props){
  const [invalidForm, setValidForm] = useState(true);
  const [state, handleChange]       = useForm({
    name: '',
    location: '',
  })

  const formRef = useRef();

  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  });

  return (
    <>
      <h1>Add Attraction</h1>
      <form  autoComplete="off" ref={formRef} onSubmit={(e) => {
        e.preventDefault()
        console.log(state, ' this is state')
        props.handleAddAttraction(state);

      }}>
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
