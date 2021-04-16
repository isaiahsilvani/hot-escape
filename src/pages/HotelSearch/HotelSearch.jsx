import React, { useState, useEffect, useRef } from 'react'
import styles from './HotelSearch.module.css'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'

export default function AddHotel(props) {
	const [invalidForm, setValidForm] = useState(true);
    const [state, handleChange] = useForm({
        name: '',
        room: '',
        checkInDate: '',
        checkOutDate: '',
        price: ''
    })
    
    const formRef = useRef();

    useEffect(() => {
        formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
      });

    return (
		<>
      <h1>Add Hotel</h1>
      <form  autoComplete="off" ref={formRef} onSubmit={(e) => {
        e.preventDefault()
        console.log(state, ' this is state')
        props.handleAddHotel(state);

      }}>
        <div className="form-group">
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
      </>
	)
}

