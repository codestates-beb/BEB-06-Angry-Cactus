import React, { useState, useRef } from 'react'

const UploadImg = () => {
  const inputFile = useRef(null)
  const [imgFile, setImgFile] = useState(''); 
  console.log(imgFile)
  const handleImage = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setImgFile(e.target.files[0])
  }
  const handleImagebutton = (e) => {
    inputFile.current.click()
  }
  return (
    <>
      <input type="file" accept="image/*" ref={inputFile} onChange={handleImage} style={{display:"none"}}/>
      <button label="업로드" onClick={handleImagebutton}>파일 업로드</button>
    </>
  )
}

export default UploadImg;