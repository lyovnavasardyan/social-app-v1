import React, { useEffect, useState } from 'react'
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks'
import { Rootstate } from '../../store/store'
import { getPhotos, uploadPhoto } from '../../store/slices/photosSlice'

import './style.css'

const PhotosPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const dispatch = useCustomDispatch()
  const { uploading, error, url, allPhotos } = useCustomSelector((state: Rootstate) => state.photosData)
  
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

  useEffect(() => {
    dispatch(getPhotos())
  }, [])

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
          {
            allPhotos.map((photo) => {
              
              return <img key={photo.id} src={photo.small} alt="" />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PhotosPage
