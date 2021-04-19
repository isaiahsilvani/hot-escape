import React, { useState, useEffect } from 'react';
import HotelSearch from '../HotelSearch/HotelSearch'
import HotelList from '../HotelList/HotelList'
import { useParams } from 'react-router-dom'

import './HotelSection.css'

export default function HotelSection(props) {
  const [display, setDisplay] = useState('view');
  const [hotelId] = useState();

  const displaySwitch = () => {
    switch(display) {
      case 'search':
        return <HotelSearch {...props}/>
      case 'view':
        return <h1>Hotel{hotelId}</h1>
      case 'list':
      default:
        return <HotelList hotels={props.itinData.hotels} {...props} />
    }
  }

  return (
    <>
      <h1>Hotels</h1>
      <div className='section-nav'>
        <div onClick={()=>setDisplay('list')}>
          My Hotels</div>
        <div onClick={()=>setDisplay('search')}>
          Add Hotels</div>
      </div>
      {displaySwitch(hotelId)}
    </>
  )
}