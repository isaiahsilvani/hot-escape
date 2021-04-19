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
    <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
      <div className="hotel-form">
        <label>Hotel Name (required)</label>
        <input
          className="form-control"
          name="name"
          value={state.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Hotel Room (required)</label>
        <input
          className="form-control"
          name="room"
          value={state.room}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Check-in Date</label>
        <input
          className="form-control"
          name="checkInDate"
          value={state.checkInDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Check-out Date</label>
        <input
          className="form-control"
          name="checkOutDate"
          value={state.checkOutDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          className="form-control"
          name="price"
          value={state.price}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="btn"
        disabled={invalidForm}
      >
        UPDATE HOTEL
      </button>
    </form>
  </>
	)
}



