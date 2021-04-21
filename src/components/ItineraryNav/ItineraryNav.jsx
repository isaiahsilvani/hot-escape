import React, { useState } from 'react';
import './ItineraryNav.css'

export default function ItineraryNav(props) {
  return (
    <div className='itineraryNav'>
      <div className={props.display==='flights' ? 'active' : undefined}
        onClick={()=>props.switchDisplay('flights')}>
        Flights</div>
      <div className={props.display==='hotels' ? 'active' : undefined}
        onClick={()=>props.switchDisplay('hotels')}>
        Hotels</div>
      <div className={props.display==='attractions' ? 'active' : undefined}
        onClick={()=>props.switchDisplay('attractions')}>
        Attractions</div>
    </div>
  )
}