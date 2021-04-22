import React, { useState, useEffect } from 'react';
import FlightSearch from '../FlightSearch/FlightSearch'
import FlightList from '../FlightList/FlightList'

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
      <div className='section-nav'>
        <div onClick={()=>setDisplay('list')}
          className={display === 'list' ? 'active' : undefined}>
          My Flights</div>
        <div onClick={()=>setDisplay('search')}
          className={display === 'search' ? 'active' : undefined}>
          Search Flights</div>
      </div>
      {message && <p>{message}</p>}
      {displaySwitch()}
    </main>
  )
}