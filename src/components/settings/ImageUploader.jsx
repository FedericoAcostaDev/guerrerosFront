import React, { useState, useRef } from 'react';
import "./ImageUploader.css"
const ImageUploader = ({defaultImage, setDefaultImage}) => {
  const fileInput = useRef(null);

  const handleClick = () => {
    fileInput.current.click();
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setDefaultImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  }
  return (
    <div className='imageUploader'>
      <input type="file" accept="image/*" ref={fileInput} onChange={handleFileChange}/>
      <img src={defaultImage} alt="Preview"/>
      <div className='imageUploader__text' onClick={handleClick}>Subir nueva imagen</div>
    </div>
  )
}

export default ImageUploader