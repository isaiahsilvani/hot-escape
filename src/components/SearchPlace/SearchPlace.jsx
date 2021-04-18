import React, { useState } from 'react';
import * as flightAPI from '../../services/flightService'
import styles from './SearchPlace.module.css'

export default function SearchPlace(props){
  const [places, setPlaces] = useState([])
  const [query, setQuery] = useState('')

  // purpose of this component is to take query in state  and return a selectable list
  // of valid places to go to
  const sendRequest = async () => {
    if (query !== "") {
      const results = await flightAPI.searchPlace(query);
      // console.log(query, results.Places);
      setPlaces(results.Places)
    }
  }

  return ( 
    <div className={styles.box}>
      <h3>{props.title}</h3>
      <label htmlFor="query">
      <input 
          value={query} 
          type="text" 
          name="query"
          onChange={(e)=> setQuery(e.target.value)}
          />
      <button onClick={sendRequest}>Search</button></label>
      {places.length ?
        <select
          size={places.length > 5 ? 5 : places.length}
          name="placeList"
        >
        {places.map((place, idx) =>
          <option 
            key={idx}
            onClick={(e) => {
              setQuery(place.PlaceName);
              props.selectPlace({code: place.PlaceId, place: place.PlaceName});
            }}
          >
            {place.PlaceName}
          </option>)}
        </select>
      :
      ''
      } 
    </div>
  );

}