import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../../../components/UserContext'
import * as hotelsAPI from '../../../services/hotelService'


export default function HotelList ({itinData, hotels, itinID, setItineraryData, setHotelId, setDisplay}) {
  const user = useContext(UserContext);

  const deleteHotel = async (hotelID) => {
    // console.log("hotelID", hotelID, "idinID", itinID);
    const result = await hotelsAPI.deleteOne(itinID, hotelID);
    setItineraryData(result);
  }

  const editHotel = (i) => {
    setDisplay('view');
    setHotelId(i)
  }
  return (
    <>
      <h1>Hotel List</h1>
      {itinData.hotels.length ?
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Room #</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Price</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {itinData.hotels.map((hotel, idx) => (
              <tr>
                <td>{hotel.name}</td>
                <td>{hotel.room}</td>
                <td>{hotel.checkInDate.split('T')[0]}</td>
                <td>{hotel.checkOutDate.split('T')[0]}</td>
                <td>{hotel.price}</td>
                <td><button onClick={()=>deleteHotel(hotel._id)} >Delete</button></td>
                <td onClick={()=> editHotel(idx)}>Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      
      : <p>No hotels yet</p>}
    </>
  );
}

