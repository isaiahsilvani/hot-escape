import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../../../components/UserContext'
import * as hotelsAPI from '../../../services/hotelService'

export default function HotelList({itinData}) {
  return (
    <>
        <h1>Hotel List</h1>
        {itinData.hotels?.map(hotel => (
          <h1>{hotel.name}</h1>
        ))}
      </>
    )
}

