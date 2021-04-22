import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import * as rentalAPI from '../../../services/rentalService'

export default function RentalEdit(props) {
  const rental = props.itinData.rentals[props.rentalId]
  const [invalidForm, setValidForm] = useState(true);
  const [state, handleChange] = useForm({
      company: rental?.company,
      pickupTime: rental?.pickupTime,
      dropoffTime: rental?.dropoffTime,
      pickupDate: rental?.pickupDate.split('T')[0],
      dropoffDate: rental?.dropoffDate.split('T')[0]
  })
    
  const formRef = useRef();

  useEffect(() => {
      formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const rentalData = {rental: state, itinID: props.itinID, rentalId: rental._id}
          const newItin = await rentalAPI.updateRental(rentalData)
          props.setItineraryData(newItin)
          props.setDisplay('list')
        } catch (err) {
          console.log(err.message)
        }
    }

    return (
        <>
          <h1>Edit Rental</h1>
          <div className="userForm">
          <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <label>Company Name (required)
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
            <label>Drop-off Time (required)
            <input
              name="dropoffTime"
              value={state.dropoffTime}
              onChange={handleChange}
              required
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
              UPDATE RENTAL
            </button>
          </form>
        </div>
        </>
    )
}