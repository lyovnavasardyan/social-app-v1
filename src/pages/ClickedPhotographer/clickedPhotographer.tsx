import { useParams } from 'react-router-dom';
import { fetchData } from '../../api/api';
import { useEffect, useState } from 'react';
import './style.css';
import { BACKEND_URL } from '../../config/config';

const PhotographerProfile = () => {
  const { userId } = useParams();
  const [currentPhotographer, setCurrentPhotographer] = useState(null);

  useEffect(() => {
    const fetchPhotographer = async () => {
      const obj = { userId };
      const response = await fetchData.getChoosenPhotographer(obj);
      setCurrentPhotographer(response.data);
    };

    fetchPhotographer();
  }, [userId]);

  if (!currentPhotographer) {
    return <div>Loading...</div>;
  }

  const photographer = currentPhotographer.data.data[0].user;
  const photos = currentPhotographer.data.data;

  return (
    <div className="photographer-profile">
      <div className="photographer-info">
        <img src={`${BACKEND_URL}${photographer?.avatar}`} className="avatar" alt="Photographer Avatar" />
        <h2>{photographer.name}</h2>
        <p>{photographer.email}</p>
        <p>{photographer.phone}</p>
        <p><a href={photographer.fb} target="_blank" rel="noopener noreferrer">Facebook Profile</a></p>
      </div>
      <div className="photographer-photos">
        {photos.map((photo) => (
          <img key={photo.id} src={`${BACKEND_URL}${photo.small}`} alt="Photographer Work" className="photo" />
        ))}
      </div>
    </div>
  );
};

export default PhotographerProfile;