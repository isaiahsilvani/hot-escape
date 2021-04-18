import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../../../components/UserContext'
import * as attractionsAPI from '../../../services/attractionService'

export default function AttractionList ({attractions}) {
    return (
        attractions.map(attraction => (
          <h1>{attraction.name}</h1>
        ))
      )
  }