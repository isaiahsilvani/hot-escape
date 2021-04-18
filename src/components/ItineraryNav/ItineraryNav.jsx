import React, { useState } from 'react';
import './ItineraryNav.css'

export default function ItineraryNav(props) {
  return (
    <div className='itineraryNav'>
      <div className={props.display==='flights' && 'active'}
        onClick={()=>props.switchDisplay('flights')}>
        Flights</div>
      <div className={props.display==='hotels' && 'active'}
        onClick={()=>props.switchDisplay('hotels')}>
        Hotels</div>
      <div className={props.display==='attractions' && 'active'}
        onClick={()=>props.switchDisplay('attractions')}>
        Attractions</div>
    </div>
  )
}