import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../../hooks/useForm'
import './CreateItinerary.css'
import * as itineraryAPI from '../../../services/itineraryService'

export default function CreateItinerary(props){
  const history = useHistory();
  const [invalidForm, setValidForm] = useState(true);
  const formRef = useRef();
  const [formData, handleChange] = useForm({
    startDate: getToday(),
    endDate: getToday(),
    origin: '',
    destination: '',
  })

  function getToday() {
    return new Date().toISOString().split('T')[0]
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  }, [formData]);

  return (
    <main>
      <div className="itinerary-form">
        <h1>Create New Itinerary</h1>
        <form 
          autoComplete="off"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <label htmlFor="origin">Origin 
          <input
            type="text"
            autoComplete="off"
            value={formData.origin}
            name="origin"
            onChange={handleChange}
            required
          /></label>
          <label htmlFor="destination">Destination 
          <input
            type="text"
            autoComplete="off"
            value={formData.destination}
            name="destination"
            onChange={handleChange}
            required
          /></label>
          <label htmlFor="flightDate">Start Date
          <input 
            type='date' 
            name='startDate'
            value={formData.startDate}
            onChange={handleChange}
            min={getToday()}
          /></label>
          <label htmlFor="flightDate">End Date
          <input 
            type='date' 
            name='endDate'
            value={formData.endDate}
            onChange={handleChange}
            min={getToday()}
          /></label>
          <button 
            onClick={handleSubmit}
            disabled={invalidForm}>
          Create</button>
        </form>
      </div>
    </main>
  )
}