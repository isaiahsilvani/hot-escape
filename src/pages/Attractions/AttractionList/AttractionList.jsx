import React from 'react';
import * as attractionsAPI from '../../../services/attractionService'

export default function AttractionList ({itinData, attractions, itinID, setItineraryData, setAttractionId, setDisplay}) {

    const deleteAttraction = async (attractionID) => {
        const result = await attractionsAPI.deleteOne(itinID, attractionID);
        setItineraryData(result);
    }

    const editAttraction = (i) => {
      setDisplay('view');
      setAttractionId(i)
    }
      
    return (
      <>
        <h1>My Attractions</h1>
        {itinData.attractions.length ?
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {itinData.attractions.map((attraction, idx) => (
                <tr>
                  <td>{attraction.name}</td>
                  <td>{attraction.location}</td>
                  <td><button onClick={()=>deleteAttraction(attraction._id)} >Delete</button></td>
                  <td><button onClick={()=> editAttraction(idx)}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        
        : <p>No attractions yet</p>}
      </>
    );
  }
  