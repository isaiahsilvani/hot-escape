import React, { useState } from 'react';
import './ItineraryNav.css'

export default function ItineraryNav(props) {


  return (
    <div className='itineraryNav'>
      <div onClick={()=>props.switchDisplay('flights')}>Flights</div>
      <div onClick={()=>props.switchDisplay('hotels')}>Hotels</div>
      <div onClick={()=>props.switchDisplay('attractions')}>Attractions</div>
    </div>
  )
}