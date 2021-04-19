import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../../../components/UserContext'
import * as hotelsAPI from '../../../services/hotelService'


// export default function HotelList({itinData}) {
//   return (
//     <>
//         <h1>Hotel List</h1>
//         {itinData.hotels?.map(hotel => (
//           <h1>{hotel.name}</h1>
//         ))}
//       </>
//     )
// }

export default function HotelList ({hotels}) {
  const user = useContext(UserContext);
    
  return (
    <>
      <h1>Hotel List</h1>
      {hotels.length ?
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Room #</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(hotel => (
              <tr>
                <td><input type="checkbox" /></td>
                <td>{hotel.name}</td>
                <td>{hotel.room}</td>
                <td>{hotel.checkInDate}</td>
                <td>{hotel.checkOutDate}</td>
                <td>{hotel.price}</td>
                {/* <button className="delete-btn">
          delete</button> */}
              </tr>
            ))}
          </tbody>
        </table>
      
      : <p>No hotels yet</p>}
    </>
  );
}

