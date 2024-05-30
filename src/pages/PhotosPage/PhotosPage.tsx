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
      dispatch(getPhotos())
    }
  }

  useEffect(()=>{
    if(isUploaded){
      photoUploadToast()
    }
  })

  const BASE_URL = "https://pinetech.org";

  return (
    <div className='photos_page'>
      <div className="upload_div">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "uploading..." : "upload"}
        </button>
        {error && <div>error: {error}</div>}
        {url && <div>url : {url}</div>}
      </div>
      <div className="all_photos_div">
        <h2>All Photos</h2>
        <div className="photos_div">
            {allPhotos.map(photo => (
                <img key={photo.id} src={`${BASE_URL}${photo.small}`} alt={photo.title || "photo"} />
            ))}
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default PhotosPage
