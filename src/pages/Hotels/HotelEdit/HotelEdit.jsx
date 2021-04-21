import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import * as hotelAPI from '../../../services/hotelService'

export default function HotelEdit(props) {
  const hotel = props.itinData.hotels[props.hotelId]
  const [invalidForm, setValidForm] = useState(true);
  const [state, handleChange] = useForm({
      name: hotel?.name,
      room: hotel?.room,
      checkInDate: hotel?.checkInDate,
      checkOutDate: hotel?.checkOutDate,
      price: hotel?.price,
  })
    
  const formRef = useRef();

  useEffect(() => {
      formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const hotelData = {hotel: state, itinID: props.itinID, hotelId: hotel._id}
          const newItin = await hotelAPI.updateHotel(hotelData)
          console.log("newItin", newItin)
          props.setItineraryData(newItin)
          props.setDisplay('list')
        } catch (err) {
          console.log(err.message)
        }
      }

  return (
  <>
    <h1>Edit Hotel</h1>
    <div className="userForm">
    <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
      <label>Hotel Name (required)
      <input
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
          name="checkInDate"
          type="date"
          value={state.checkInDate.split('T')[0]}
          onChange={handleChange}
        /></label>
        <label>Check-out Date
        <input
          name="checkOutDate"
          type="date"
          value={state.checkOutDate.split('T')[0]}
          onChange={handleChange}
        /></label>
        <label>Price
        <input
          name="price"
          value={state.price}
          onChange={handleChange}
          required
        /></label>
      <button
        type="submit"
        disabled={invalidForm}
      >
        UPDATE HOTEL
      </button>
    </form>
    </div>
  </>
	)
}



