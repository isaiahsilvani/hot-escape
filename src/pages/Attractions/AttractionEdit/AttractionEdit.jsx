import React, { useState, useEffect, useRef } from "react";
import { useForm } from "../../../hooks/useForm";
import * as attractionAPI from "../../../services/attractionService";

export default function AttractionEdit(props) {
  const attraction = props.itinData.attractions[props.attractionId];
  const [invalidForm, setValidForm] = useState(true);
  const [state, handleChange] = useForm({
    name: attraction?.name,
    location: attraction?.location,
  });

  const formRef = useRef();

  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const attractionData = {
        attraction: state,
        itinID: props.itinID,
        attractionId: attraction._id,
      };
      const newItin = await attractionAPI.updateAttraction(attractionData);
      console.log("newItin", newItin);
      props.setItineraryData(newItin);
      props.setDisplay("list");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h1>Edit Attraction</h1>
      <div className="userForm">
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
            <label>Name
            <input
                className="form-control"
                name="name"
                value={state.name}
                onChange={handleChange}
                required
            /></label>
            <label>Location
            <input
                className="form-control"
                name="location"
                value={state.location}
                onChange={handleChange}
                required
            /></label>
            <button type="submit" className="btn" disabled={invalidForm}>
            UPDATE ATTRACTION
            </button>
      </form>
    </div>
    </>
  );
}
