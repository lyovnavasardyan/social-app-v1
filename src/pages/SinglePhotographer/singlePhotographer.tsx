import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotographerById, photographer, photos, loading, lastPage, getPhotographerByIdPhotos } from '../../store/slices/singlePhotographerSlice';
import './style.css';
import { BACKEND_URL } from '../../config/config';
import Modal from '../../components/Modal';
import PhotoModal from '../../components/PhotoModal/PhotoModal';
import RandomPhotos from '../../components/RandomPhotos/randomPhotos';
import { getRandomPhotos } from '../../store/slices/modalPhotoSlice';
import Image from '../../components/SmallComponents/Image/Image';
import Button from '../../components/SmallComponents/Button/Button';


const PhotographerProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const clickedPhotographer = useSelector(photographer);
  const ownPhotos = useSelector(photos);
  const isloading = useSelector(loading);
  const photosLastPage = useSelector(lastPage)

  const [photoModalInfo, setPhotoModalInfo] = useState({ photoData: {} })
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)

  const obj = { userId, currentPage: currentPage }



  useEffect(() => {
    dispatch(getPhotographerById(obj));
  }, []);

  useEffect(() => {
    if (currentPage >= 1 && currentPage <= photosLastPage) {
      dispatch(getPhotographerByIdPhotos(obj))
    }
  }, [userId, currentPage])

  console.log(photosLastPage);


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
      {(photosLastPage !== 1 && currentPage !== photosLastPage) && (
       <Button
        text={'More'}
        size='small'
        onClick={() => setCurrentPage(currentPage + 1)}
        />
        )}
      
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