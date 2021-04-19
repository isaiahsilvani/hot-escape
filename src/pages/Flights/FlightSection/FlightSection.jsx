import React, { useState, useEffect } from 'react';
import FlightSearch from '../FlightSearch/FlightSearch'
import FlightList from '../FlightList/FlightList'
import { useParams } from 'react-router-dom'

import './FlightSection.css'

export default function FlightSection(props) {
  const [display, setDisplay] = useState('list');
  const [message, setMessage] = useState('');

  const displaySwitch = () => {
    switch(display) {
      case 'search':
        return <FlightSearch setDisplay={setDisplay} {...props}/>
      case 'list':
      default:
        return <FlightList flights={props.itinData.flights} setMessage={setMessage} controls='del' setDisplay={setDisplay} {...props} />
    }
  }

  return (
    <main>
      <h1>Flights</h1>
      <div className='section-nav'>
        <div onClick={()=>setDisplay('list')}>
          My Flights</div>
        <div onClick={()=>setDisplay('search')}>
          Search Flights</div>
        {/* <div onClick={()=> {
          setDisplay('view');
          setFlightId(666)}}>
          Flight Details</div> */}
      </div>
      <p>{message}</p>
      {displaySwitch()}
    </main>
  )
}