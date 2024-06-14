import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotographerById, photographer, photos, loading, page, lastPage } from '../../store/slices/singlePhotographerSlice';
import './style.css';
import { BACKEND_URL } from '../../config/config';
import Modal from '../../components/Modal';
import PhotoModal from '../../components/PhotoModal/PhotoModal';
import RandomPhotos from '../../components/RandomPhotos/randomPhotos';
import { getRandomPhotos } from '../../store/slices/modalPhotoSlice';
import Image from '../../components/SmallComponents/Image/Image';


const PhotographerProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const clickedPhotographer = useSelector(photographer);
  const ownPhotos = useSelector(photos);
  const isloading = useSelector(loading);

  const [photoModalInfo, setPhotoModalInfo] = useState({ photoData: {} })
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)

  const obj = { userId, currentPage: currentPage }

  

  useEffect(() => {
    if (currentPage >= 1 && currentPage <= 5) {
      dispatch(getPhotographerById(obj));
    }
  }, [userId, currentPage]);


  if (isloading) {
    return <div>Loading...</div>;
  }

  if (!clickedPhotographer) {
    return <div>No data found</div>;
  }  

  return (
    <div className="photographer-profile">
      <div className="photographer-info">
        <Image url={BACKEND_URL + clickedPhotographer?.avatar} className="avatar" alt='avatar' />
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
        {ownPhotos.map(photo => {

          return <img
            onClick={() => {
              setPhotoModalInfo({ photoData: photo });
              setShowModal(true);
              dispatch(getRandomPhotos({ id: photo.id, categoryId: photo.categories[0].id }))
            }}
            key={photo.id}
            src={`${BACKEND_URL}${photo.small}`}
            alt="Photographer Work"
            className="photographer-photo"
          />
        })}
      </div>
      <div className='pagination_div'>
        <button onClick={() => {
          if(currentPage > 1) {
            setCurrentPage(() => currentPage - 1)
          }
        }} className='prev'>Prev</button>
        <button onClick={() => {
          if(currentPage < 5) {
            setCurrentPage(() => currentPage + 1)
          }
        }} className='next'>Next</button>
      </div>
      <Modal
        shouldShow={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <PhotoModal photoInfo={photoModalInfo.photoData} />
        <RandomPhotos setPhotoModalInfo={setPhotoModalInfo} />
      </Modal>

    </div>
  );
};
export default PhotographerProfile;