import React from 'react';
import * as rentalsAPI from '../../../services/rentalService'

export default function RentalList ({itinData, itinID, setItineraryData, setRentalId, setDisplay}) {

  const deleteRental = async (rentalID) => {
    const result = await rentalsAPI.deleteOne(itinID, rentalID);
    setItineraryData(result);
  }

  const editRental = (i) => {
    setDisplay('view');
    setRentalId(i)
  }
  return (
    <>
      <h1>My Rentals</h1>
      {itinData.rentals.length ?
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Pick-up Time</th>
              <th>Drop-off Time</th>
              <th>Pick-up Date</th>
              <th>Drop-off Date</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {itinData.rentals.map((rental, idx) => (
              <tr>
                <td>{rental.company}</td>
                <td>{rental.pickupTime}</td>
                <td>{rental.dropoffTime}</td>
                <td>{rental.pickupDate.split('T')[0]}</td>
                <td>{rental.dropoffDate.split('T')[0]}</td>
                <td><button onClick={()=>deleteRental(rental._id)} >Delete</button></td>
                <td><button onClick={()=> editRental(idx)}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      
      : <p>No rentals yet</p>}
    </>
  );
}