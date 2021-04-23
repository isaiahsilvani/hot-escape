import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import * as rentalAPI from '../../../services/rentalService'

export default function AddRental({itinID, setItineraryData, setDisplay}) {
    const history = useHistory();
	  const [invalidForm, setValidForm] = useState(true);
    const [state, handleChange] = useForm({
        company: '',
        pickupTime: '10:00',
        dropoffTime: '10:00',
        pickupDate: getToday(),
        dropoffDate: getTomorrow(),
    })
    
    const formRef = useRef();

    useEffect(() => {
        formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
      });

      function getToday() {
        return new Date().toISOString().split('T')[0]
      }

      function getTomorrow() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow.toISOString().split('T')[0]
      }

      const handleSubmit = async (e) => {
          e.preventDefault();
          try{
            const rentalData = {...state, itinID}
            const newItin = await rentalAPI.addRental(rentalData)
            setItineraryData(newItin)
            setDisplay('list')
          } catch (err) {
            console.log(err.message)
          }
        }

    return (
    <>
      <h1>Add Rental</h1>
      <div className="userForm">
      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <label>Rental Company (required)
        <input
          className="form-control"
          name="company"
          value={state.company}
          onChange={handleChange}
          required
        /></label>
        <label>Pick-up Time (required)
        <input
          name="pickupTime"
          value={state.pickupTime}
          onChange={handleChange}
          required
        /></label>
        <label>Drop-off Time
        <input
          name="dropoffTime"
          value={state.dropoffTime}
          onChange={handleChange}
        /></label>
        <label>Pick-up Date
        <input
          type="date"
          name="pickupDate"
          value={state.pickupDate}
          onChange={handleChange}
        /></label>
        <label>Drop-off Date
        <input
          type="date"
          name="dropoffDate"
          value={state.dropoffDate}
          onChange={handleChange}
        /></label>
        <button
          type="submit"
          disabled={invalidForm}
        >
          ADD RENTAL
        </button>
      </form>
    </div>
    </>
	)
}