import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../../../components/UserContext'
import * as attractionsAPI from '../../../services/attractionService'

export default function AttractionList ({attractions, itinID, setItineraryData}) {
    const user = useContext(UserContext);

    const deleteAttraction = async (attractionID) => {
        const result = await attractionsAPI.deleteOne(itinID, attractionID);
        setItineraryData(result);
    }
      
    return (
      <>
        <h1>Attraction List</h1>
        {attractions.length ?
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {attractions.map(attraction => (
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>{attraction.name}</td>
                  <td>{attraction.location}</td>
                  <td><button onClick={()=>deleteAttraction(attraction._id)} >Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        
        : <p>No attractions yet</p>}
      </>
    );
  }
  