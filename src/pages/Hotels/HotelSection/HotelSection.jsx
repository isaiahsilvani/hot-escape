import React, { useState, useEffect } from 'react';
import HotelSearch from '../HotelSearch/HotelSearch'
import HotelList from '../HotelList/HotelList'
import HotelEdit from '../HotelEdit/HotelEdit'
import { useParams } from 'react-router-dom'

import './HotelSection.css'

export default function HotelSection(props) {
  const [display, setDisplay] = useState('list');
  const [hotelId, setHotelId] = useState(0);

  const displaySwitch = () => {
    switch(display) {
      case 'search':
        return <HotelSearch setDisplay={setDisplay} {...props}/>
      case 'view':
        return <HotelEdit setDisplay={setDisplay} hotelId={hotelId} {...props} />
      case 'list':
      default:
        return <HotelList setDisplay={setDisplay} setHotelId={setHotelId} {...props} />
    }
  }

  return (
    <>
      <div className='section-nav'>
        <div onClick={()=>setDisplay('list')}
          className={display === 'list' ? 'active' : undefined}>
          My Hotels</div>
        <div onClick={()=>setDisplay('search')}
          className={display === 'search' ? 'active' : undefined}>
          Add Hotels</div>
      </div>
      {displaySwitch()}
    </>
  )
}