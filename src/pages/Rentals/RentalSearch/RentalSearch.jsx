import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import * as rentalAPI from '../../../services/rentalService'

export default function AddRental({itinID, setItineraryData, setDisplay}) {
    const history = useHistory();
	  const [invalidForm, setValidForm] = useState(true);
    const [state, handleChange] = useForm({
        company: 'Name',
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
            console.log("newItin", newItin)
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
        <label>Rental Name (required)
        <input
          className="form-control"
          name="name"
          value={state.company}
          onChange={handleChange}
          required
        /></label>
        <label>Rental Room (required)
        <input
          name="room"
          value={state.pickupTime}
          onChange={handleChange}
          required
        /></label>
        <label>Check-in Date
        <input
          type="date"
          name="checkInDate"
          value={state.dropoffTime}
          onChange={handleChange}
        /></label>
        <label>Check-out Date
        <input
          type="date"
          name="checkOutDate"
          value={state.pickupDate}
          onChange={handleChange}
        /></label>
        <label>Price
        <input
          name="price"
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