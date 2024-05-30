import React, { useState } from 'react'
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks'
import { Rootstate } from '../../store/store'
import { uploadPhoto } from '../../store/slices/photosSlice'
const PhotosPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const dispatch = useCustomDispatch()
  const { uploading, error, url } = useCustomSelector((state: Rootstate) => state.photosData)

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

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "uploading..." : "upload"}
      </button>
      {error && <div>error: {error}</div>}
      {url && <div>url : {url}</div>}
      <img src={url?.toString()} alt="" />
    </div>
  )
}

export default PhotosPage
