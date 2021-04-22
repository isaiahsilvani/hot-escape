import React, { useState, useEffect } from 'react';
import RentalSearch from '../RentalSearch/RentalSearch'
import RentalList from '../RentalList/RentalList'
import RentalEdit from '../RentalEdit/RentalEdit'
import { useParams } from 'react-router-dom'

export default function RentalSection(props) {
  const [display, setDisplay] = useState('list');
  const [rentalId, setRentalId] = useState(0);

  const displaySwitch = () => {
    switch(display) {
      case 'search':
        return <RentalSearch setDisplay={setDisplay} {...props}/>
      case 'view':
        return <RentalEdit setDisplay={setDisplay} rentalId={rentalId} {...props} />
      case 'list':
      default:
        return <RentalList setDisplay={setDisplay} setRentalId={setRentalId} {...props} />
    }
  }

  return (
    <>
      <div className='section-nav'>
        <div onClick={()=>setDisplay('list')}
          className={display === 'list' ? 'active' : undefined}>
          My rentals</div>
        <div onClick={()=>setDisplay('search')}
          className={display === 'search' ? 'active' : undefined}>
          Add rentals</div>
      </div>
      {displaySwitch(rentalId)}
    </>
  )
}
