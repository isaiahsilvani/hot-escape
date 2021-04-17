import React, { useState, useEffect, useRef } from 'react'
import styles from './HotelSearch.module.css'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import * as hotelAPI from '../../services/hotelService'

export default function AddHotel(props) {
    const history = useHistory();
	const [invalidForm, setValidForm] = useState(true);
    const [state, handleChange] = useForm({
        name: 'Name',
        room: '000',
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
              await hotelAPI.addHotel(state)
              history.pushState("/hotels")
          } catch (err) {
              console.log(err.message)
          }
      }

    return (
		<main className="hotel-search">
      <h1>Add Hotel</h1>
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
            value={ state.room}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Check-in Date</label>
          <input
            className="form-control"
            name="checkInDate"
            value={ state.checkInDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Check-out Date</label>
          <input
            className="form-control"
            name="checkOutDate"
            value={ state.checkOutDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            name="price"
            value={ state.price}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn"
          disabled={invalidForm}
        >
          ADD HOTEL
        </button>
      </form>
    </main>
	)
}



