import React, {Component, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../../hooks/useForm';
import * as attractionAPI from '../../../services/attractionService'

export default function AddAttraction({itinID, setDisplay, setItineraryData}){
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
      const attractionData = {...state, itinID}
      const newItin = await attractionAPI.addAttraction(attractionData)
      console.log("newItin", newItin)
      setItineraryData(newItin)
      setDisplay('list')
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <h1>Add Attraction</h1>
      <div className="userForm">
      <form  autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <label>Name
        <input
          name="name"
          value={state.name}
          onChange={handleChange}
          required
        /></label>
        <label>Location
        <input
          name="location"
          value={ state.location}
          onChange={handleChange}
          required
        /></label>
        <button
          type="submit"
          disabled={invalidForm}
        >
          ADD ATTRACTION
        </button>
      </form>
      </div>
    </>
  );
  
}
