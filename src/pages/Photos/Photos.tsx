import { useEffect, useState } from 'react'
import './style.css';
import { useCustomDispatch } from '../../customHooks/customHooks'
import { done, getAllPhotos, photos } from '../../store/slices/allUserPhotosSlice'
import { useSelector } from 'react-redux'
import LoadingGif from '../../../public/LoadingGif/loadingGif'
import { BACKEND_URL } from '../../config/config'
import { FaEye, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import PhotoModal from '../../components/PhotoModal/PhotoModal';
import RandomPhotos from '../../components/RandomPhotos/randomPhotos';
import { getRandomPhotos } from '../../store/slices/modalPhotoSlice';

const Photos = () => {
    const photosData = useSelector(photos);
    const isPhotosDone = useSelector(done);
    const dispatch = useCustomDispatch();
    const navigate = useNavigate();

    const [photoModalInfo, setPhotoModalInfo] = useState({ photoData: {} })
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [])

    console.log(photosData);

    return (
        <div>
            {
                !isPhotosDone ? <LoadingGif /> : (

                    <div className="photos">
                        {
                            photosData?.data?.map((photo: any) => (

                                <div className="photo" key={photo.id}>
                                    <div className="photo-header">
                                        <img src={BACKEND_URL + photo?.user?.avatar} className="avatar" alt={photo?.user?.name} onClick={() =>
                                            navigate(`/photographer/${photo.user.id}`)
                                        } />
                                        <h5>{photo?.user?.name}</h5>
                                    </div>
                                    <img src={BACKEND_URL + photo.small} alt={photo.title} className="photo-image" onClick={() =>{
                                                      setPhotoModalInfo({ photoData: photo });
                                                      setShowModal(true);
                                                      dispatch(getRandomPhotos({ id: photo.id, categoryId: photo.categories[0].id }))
                                    }
                                    } />
                                    <div className='photo-meta'>
                                        <span><FaEye /> {photo.views}</span>
                                        <span><FaCalendarAlt /> {new Date(photo.created_at).toISOString().split('T')[0]}</span>
                                    </div>
                                </div>
                            ))
                        }
                        <Modal
                            shouldShow={showModal}
                            onRequestClose={() => setShowModal(false)}
                        >
                            <PhotoModal photoInfo={photoModalInfo.photoData} />
                            <RandomPhotos setPhotoModalInfo={setPhotoModalInfo} />
                        </Modal>
                    </div>
                )
            }
        </div>
    )
}



export default Photos
