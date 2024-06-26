import React, { useEffect, useState } from 'react'
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks'
import { Rootstate } from '../../store/store'
import { getPhotos, uploadPhoto } from '../../store/slices/photosSlice'
import { ToastContainer } from 'react-toastify'
import { isUploadedSelector } from '../../store/slices/photosSlice'
import { photoUploadToast } from './toastphotoUpload'

import './style.css'
import { useSelector } from 'react-redux'

const PhotosPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const dispatch = useCustomDispatch()
  const { uploading, error, url, allPhotos } = useCustomSelector((state: Rootstate) => state.photosData)

  const isUploaded = useSelector(isUploadedSelector)

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      dispatch(uploadPhoto(file))
    }
  }

  useEffect(() => {
    dispatch(getPhotos())
  }, [])

  useEffect(()=>{
    if(isUploaded){
      photoUploadToast()
      dispatch(getPhotos())
    }
  },[isUploaded])

  const BASE_URL = "https://pinetech.org";

  return (
    <div className='photos_page'>
    <div className="upload_div">
      <label className="add_photo_label" style={{ backgroundColor: '#007bff', padding: '8px 12px', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>
        Add Photo
        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
      </label>
      <button className="upload_button" onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <div className="error_message">Error: {error}</div>}
      {url && <div className="url_message">URL: {url}</div>}
    </div>
    <div className="all_photos_div">
      <h2>All Photos</h2>
      <div className="photos_div">
        {allPhotos.map((photo) => (
          <img key={photo.id} src={`${BASE_URL}${photo.small}`} alt={photo.title || 'photo'} />
        ))}
      </div>
    </div>
    <ToastContainer />
  </div>
  )
}

export default PhotosPage
