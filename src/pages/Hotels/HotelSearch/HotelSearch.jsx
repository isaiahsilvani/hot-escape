import React, { useState, useEffect, useRef } from 'react'
import styles from './HotelSearch.module.css'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import * as hotelAPI from '../../../services/hotelService'

export default function AddHotel({itinID, setItineraryData, setDisplay}) {
    const history = useHistory();
	  const [invalidForm, setValidForm] = useState(true);
    const [state, handleChange] = useForm({
        name: 'Name',
        room: '00',
        checkInDate: getToday(),
        checkOutDate: getTomorrow(),
        price: '$0.00'
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
            const hotelData = {...state, itinID}
            const newItin = await hotelAPI.addHotel(hotelData)
            console.log("newItin", newItin)
            setItineraryData(newItin)
            setDisplay('list')
          } catch (err) {
            console.log(err.message)
          }
        }

    return (
    <>
      <h1>Add Hotel</h1>
      <div className="userForm">
      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <label>Hotel Name (required)
        <input
          className="form-control"
          name="name"
          value={state.name}
          onChange={handleChange}
          required
        /></label>
        <label>Hotel Room (required)
        <input
          name="room"
          value={state.room}
          onChange={handleChange}
          required
        /></label>
        <label>Check-in Date
        <input
          type="date"
          name="checkInDate"
          value={state.checkInDate}
          onChange={handleChange}
        /></label>
        <label>Check-out Date
        <input
          type="date"
          name="checkOutDate"
          value={state.checkOutDate}
          onChange={handleChange}
        /></label>
        <label>Price
        <input
          name="price"
          value={state.price}
          onChange={handleChange}
        /></label>
        <button
          type="submit"
          disabled={invalidForm}
        >
          ADD HOTEL
        </button>
      </form>
    </div>
    </>
	)
}



