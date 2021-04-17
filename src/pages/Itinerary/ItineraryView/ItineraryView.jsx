import React, { useState } from 'react';
import { useParams } from 'react-router-dom'

export default function ItineraryView(props) {
  const {id} = useParams();

  return (
    <main>
      <h1>{id}</h1>
    </main>
  )
};