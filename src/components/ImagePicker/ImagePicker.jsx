import React, { useState, useEffect } from 'react';
import './ImagePicker.css'

function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('../../img/escapeImages/', false, /\.(png|webp|jpe?g|svg)$/));

export default function ImagePicker (props) {
  const [chosenImg, setChosenImg] = useState(0);
  
  useEffect(()=>{
    if (props?.startImg) {
      const index = images.findIndex(image => image.default === props.startImg)
      setChosenImg(index)
    }
  },[])

  useEffect(()=>{
    props.setEscapeImg(images[chosenImg].default)
  },[chosenImg])

  const showImg = (n) => {
    let i = chosenImg;
    i = (i+n >= images.length) ? 0 : (i+n < 0) ? images.length-1 : i+n;
    setChosenImg(i)
  }
  return (
    <div className="imagePicker">
      <label htmlFor="escapeImage">Choose an image for your Escape</label>
      <img name="escapeImage" src={images[chosenImg].default} />
      <div className="controls">
        <span onClick={()=>showImg(-1)}>&#8592;</span>
        <span onClick={()=>showImg(1)}>&#8594;</span>
      </div>
    </div>
  )

}