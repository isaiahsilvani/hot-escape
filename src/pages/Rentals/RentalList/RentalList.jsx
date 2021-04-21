import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../../../components/UserContext'
import * as RentalsAPI from '../../../services/RentalService'


export default function RentalList ({itinData, rentals, itinID, setItineraryData, setRentalId, setDisplay}) {
  const user = useContext(UserContext);

  const deleteRental = async (RentalID) => {
    // console.log("RentalID", RentalID, "idinID", itinID);
    const result = await RentalsAPI.deleteOne(itinID, RentalID);
    setItineraryData(result);
  }

  const editRental = (i) => {
    setDisplay('view');
    setRentalId(i)
  }
  return (
    <>
      <h1>Rental List</h1>
      {itinData.Rentals.length ?
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
            {itinData.Rentals.map((Rental, idx) => (
              <tr>
                <td>{Rental.company}</td>
                <td>{Rental.pickupTime}</td>
                <td>{Rental.dropoffTime.split('T')[0]}</td>
                <td>{Rental.pickupDate.split('T')[0]}</td>
                <td>{Rental.dropoffDate}</td>
                <td><button onClick={()=>deleteRental(Rental._id)} >Delete</button></td>
                <td onClick={()=> editRental(idx)}>Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      
      : <p>No Rentals yet</p>}
    </>
  );
}