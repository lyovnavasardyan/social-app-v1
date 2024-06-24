import axios from 'axios';
import { useState, useEffect } from 'react';
import { getPhotos } from '../../store/slices/photosSlice';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import './style.css'
import ProfilePhoto from '../ProfilePhoto/profilePhoto';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);

      const formData = new FormData();
      formData.append('file', selectedFile);

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
        dispatch(getPhotos());
      } catch (err) {
        setError("Failed to upload the file. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="cover-wrapper">
        {allPhotos.length > 0 && (
          <div className="cover-photo-div">
            <img className="cover-photo" src={`${BASE_URL}/storage/${allPhotos[0].user.cover}`} alt="cover" />
            <ProfilePhoto />
          </div>
        )}
        <label className="cover-custom-file-upload">
          +
          <input type="file" onChange={handleFileChange} className="file-input" />
        </label>
      </div>
      {data && <div className="cover-success-message">Upload successful!</div>}
      {error && <div className="cover-error-message">{error}</div>}
    </div>
  );
};

export default CoverPhoto;
