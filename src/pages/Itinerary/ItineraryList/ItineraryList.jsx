import React, { useContext, useEffect, useState } from "react";
import {Redirect} from 'react-router-dom'
import { Link } from "react-router-dom";
import { UserContext } from "../../../components/UserContext";
import * as itineraryAPI from "../../../services/itineraryService";
import ItineraryCard from '../../../components/ItineraryCard/ItineraryCard'
import CreateItinerary from '../CreateItinerary/CreateItinerary'
import styles from './ItineraryList.module.css'

export default function ItineraryList (props) {
  const [itineraryList, setItineraryList] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const itineraryList = await itineraryAPI.getAll(user._id);
      console.log(itineraryList);
      setItineraryList(itineraryList);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.cardContainer}>
      {itineraryList.length > 0
        ? itineraryList.map((itin) => (
          <Link to={"/itinerary/" + itin._id}>
            <ItineraryCard itinData={itin} />
          </Link>
          ))
        : <CreateItinerary />}
    </div>
  );
};

