import axios from 'axios';
import { useState, useEffect } from 'react';
import { getPhotos } from '../../store/slices/photosSlice';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import './style.css'


const CoverPhoto = () => {
  const dispatch = useCustomDispatch();
  const token = localStorage.getItem("jwtToken");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { allPhotos } = useCustomSelector((state: RootState) => state.photosData);

  const BASE_URL = "https://pinetech.org";

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('https://pinetech.org/api/cover', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (err) {
      setError("Failed to upload the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };


console.log(allPhotos)
  return (
    <div className="container">
      <div className="cover-wrapper">
        {allPhotos.length > 0 && (
         <img className="cover-photo" src={`${BASE_URL}/storage/${allPhotos[0].user.cover}`} alt="cover" />
        ) }
        <label className="cover-custom-file-upload">
          +
          <input type="file" onChange={handleFileChange} className="file-input" />
        </label>
      </div>
      <span>{fileName}</span>
      <button onClick={handleUpload} disabled={loading} className="cover-upload-button">
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {data && <div className="success-message">Upload successful!</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CoverPhoto;