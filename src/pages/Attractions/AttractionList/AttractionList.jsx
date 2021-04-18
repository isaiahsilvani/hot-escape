import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../../../components/UserContext'
import * as attractionsAPI from '../../../services/attractionService'

export default function AttractionList ({itinData}) {
    return (
      <>
        <h1>Attraction List</h1>
        {itinData.attractions?.map(attraction => (
          <h1>{attraction.name}</h1>
        ))}
      </>
    )
}