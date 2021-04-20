import React, { useContext, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../../hooks/useForm'
import './CreateItinerary.css'
import * as itineraryAPI from '../../../services/itineraryService'
import { UserContext } from '../../../components/UserContext'

export default function CreateItinerary(props){
  const user = useContext(UserContext)
  const history = useHistory();
  const [invalidForm, setValidForm] = useState(true);
  const formRef = useRef();
  const [formData, handleChange] = useForm({
    startDate: getToday(),
    endDate: getToday(),
    origin: '',
    destination: '',
    owner: user._id,
  })
  const [message, setMessage] = useState('');

  function getToday() {
    return new Date().toISOString().split('T')[0]
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const newItin = await itineraryAPI.addItinerary({formData})
      history.push("/itinerary/" + newItin._id);
    } catch (err) {
      setMessage(err.message)
    }

  }

  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  }, [formData]);

  return (
    <main>
      <h1>Create New Itinerary</h1>
      <div className="userForm">
        <form 
          autoComplete="off"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          {message && <p>{message}</p>}
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