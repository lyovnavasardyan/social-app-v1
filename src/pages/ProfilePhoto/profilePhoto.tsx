import axios from 'axios';
import { useState, useEffect } from 'react';
import { getPhotos } from '../../store/slices/photosSlice';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const ProfilePhoto = () => {
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
      handleUpload(event.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('https://pinetech.org/api/avatar', formData, {
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
  };

  return (
    <div className="profile-photo-container">
      <div className="avatar-wrapper">
        {allPhotos.length > 0 && (
          <>
            <img className="user-avatar" src={`${BASE_URL}${allPhotos[0].user.avatar}`} alt="avatar" />
            <label className="custom-file-upload">
              <p>+</p>
              <input type="file" onChange={handleFileChange} className="file-input" />
            </label>
          </>
        )}
      </div>
      {data && <div className="success-message">Upload successful!</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ProfilePhoto;
