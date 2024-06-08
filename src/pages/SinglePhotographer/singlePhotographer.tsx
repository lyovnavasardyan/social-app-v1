import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotographerById, photographer, photos, loading } from '../../store/slices/singlePhotographerSlice';
import './style.css';
import { BACKEND_URL } from '../../config/config';
import Modal from '../../components/Modal';
import PhotoModal from '../../components/PhotoModal/PhotoModal';
import axios from 'axios';
import RandomPhotos from '../../components/RandomPhotos/randomPhotos';


const PhotographerProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const clickedPhotographer = useSelector(photographer);
  const ownPhotos = useSelector(photos);
  const isloading = useSelector(loading);

  const [photoModalInfo, setPhotoModalInfo] = useState({photoData:{}})

  const [showModal, setShowModal] = useState(false);
  const [randomPhotoData,setRandomPhotoData] = useState([]);

  const getRandomPhotos = async (id, categoryId) => {
    try {
      const response = await axios.post(
        "https://pinetech.org/api/get-random-photos-by-category",
        { currentPhotoId: id,  id: categoryId},
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
      setRandomPhotoData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching random photos:", error);
      throw error;
    }
  };
  

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
        {ownPhotos.map(photo => (
          
          <img 
            onClick={() => {
              console.log(photo)
              setPhotoModalInfo({ photoData: photo });
              setShowModal(true);
              getRandomPhotos(photo.id, photo.categories[0].id)
            }} 
            key={photo.id} 
            src={`${BACKEND_URL}${photo.small}`} 
            alt="Photographer Work" 
            className="photographer-photo" 
          />
        ))}
      </div>
      
        <Modal 
          shouldShow={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <PhotoModal photoInfo={photoModalInfo.photoData}/> 
          <RandomPhotos randomPhotoData = {randomPhotoData}/>
        </Modal>
     
    </div>
  );
};
export default PhotographerProfile;