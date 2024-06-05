import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotographerById, photographer, photos, loading } from '../../store/slices/clickedPhotographerSlice';
import './style.css';
import { BACKEND_URL } from '../../config/config';
import Modal from '../../components/Modal';
import PhotoModal from '../../components/PhotoModal/PhotoModal';


const PhotographerProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const clickedPhotographer = useSelector(photographer);
  const ownPhotos = useSelector(photos);
  const isloading = useSelector(loading);

  const [photoModalInfo, setPhotoModalInfo] = useState({
    isOpen: false,
    photoData: {}
  })

  useEffect(() => {
    dispatch(getPhotographerById(userId));
  }, [userId]);

  if (isloading) {
    return <div>Loading...</div>;
  }


  if (!clickedPhotographer) {
    return <div>No data found</div>;
  }

  return (
    <div className="photographer-profile">
      <div className="photographer-info">
        <img src={`${BACKEND_URL}${clickedPhotographer?.avatar}`} className="avatar" alt="Photographer Avatar" />
        <h2>{clickedPhotographer.name}</h2>
        <p>{clickedPhotographer.email}</p>
        <p>{clickedPhotographer.phone}</p>
        <p>
          <a href={clickedPhotographer.fb} target="_blank" rel="noopener noreferrer">
            Facebook Profile
          </a>
        </p>
      </div>
      <div className="photographer-photos">
        {ownPhotos.map((photo: any) => (
          <img onClick={() => setPhotoModalInfo({isOpen: true, photoData: photo})} key={photo.id} src={`${BACKEND_URL}${photo.small}`} alt="Photographer Work" className="photographer-photo" />
        ))}
      </div>
      <Modal isOpen={photoModalInfo.isOpen}>
        <PhotoModal
          photoInfo={photoModalInfo.photoData}
          setPhotoModalInfo={setPhotoModalInfo}
        />
      </Modal>
    </div>
  );
};

export default PhotographerProfile;