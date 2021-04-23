import React, { useContext, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../../hooks/useForm'
import styles from './EditItinerary.module.css'
import * as itineraryAPI from '../../../services/itineraryService'
import { UserContext } from '../../../components/UserContext'
import ImagePicker from '../../../components/ImagePicker/ImagePicker'

export default function EditItinerary({itinData, setEditItin, setItineraryData}){
  const user = useContext(UserContext);
  const history = useHistory();
  const [invalidForm, setValidForm] = useState(true);
  const formRef = useRef();
  const [formData, handleChange] = useForm({
    startDate: itinData.startDate.split('T')[0],
    endDate: itinData.endDate.split('T')[0],
    origin: itinData.origin,
    destination: itinData.destination,
  })
  const [escapeImg, setEscapeImg] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const newData = {...formData, owner: user._id, itinID: itinData._id, imageSrc: escapeImg }
      const newItin = await itineraryAPI.updateItinerary(newData)
      setItineraryData(newItin)
      setEditItin(false);
    } catch (err) {
      setMessage(err.message)
    }
  }

  const deleteItin = async (e) => {
    e.preventDefault();
    const result = await itineraryAPI.deleteItinerary(itinData._id)
    history.push('/itinerary')
  }

  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  }, [formData]);

  return (
    <>
    <div className="whiteBox">
    <h1>Edit Escape</h1>
    <div className={styles.twoColumns}>
        <div className={styles.colOne}>
         <ImagePicker setEscapeImg={setEscapeImg} startImg={itinData.imageSrc} />
        </div>
        <div className={`userForm ${styles.colTwo}`}>
          <form 
            autoComplete="off"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            {message && <p>{message}</p>}
            <label htmlFor="origin">Origin 
            <input
              type="text"
              autoComplete="off"
              value={formData.origin}
              name="origin"
              onChange={handleChange}
              required
            /></label>
            <label htmlFor="destination">Destination 
            <input
              type="text"
              autoComplete="off"
              value={formData.destination}
              name="destination"
              onChange={handleChange}
              required
            /></label>
            <label htmlFor="flightDate">Start Date
            <input 
              type='date' 
              name='startDate'
              value={formData.startDate}
              onChange={handleChange}
            /></label>
            <label htmlFor="flightDate">End Date
            <input 
              type='date' 
              name='endDate'
              value={formData.endDate}
              onChange={handleChange}
            /></label>
            <button className={styles.danger}
              onClick={deleteItin}>
              Delete Escape</button>
            <div className={styles.buttons}>
            <button 
              onClick={()=>setEditItin(false)}
              disabled={invalidForm}>
            Cancel</button>
            <button 
              onClick={handleSubmit}
              disabled={invalidForm}>
            Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}