import React, { useEffect } from 'react'
import './style.css';
import { useCustomDispatch } from '../../customHooks/customHooks'
import { done, getAllPhotos, photos } from '../../store/slices/allUserPhotosSlice'
import { useSelector } from 'react-redux'
import LoadingGif from '../../../public/LoadingGif/loadingGif'
import { BACKEND_URL } from '../../config/config'
import { FaEye, FaCalendarAlt } from 'react-icons/fa';

const Photos = () => {
    const photosData = useSelector(photos);
    const isPhotosDone = useSelector(done);
    const dispatch = useCustomDispatch()    

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
                            photosData?.data?.map((photo) => (
                                <div className="photo" key={photo.id}>
                                    <div className="photo-header">
                                        <img src={BACKEND_URL + photo?.user?.avatar} className="avatar" alt={photo?.user?.name} />
                                        <h5>{photo?.user?.name}</h5>
                                    </div>
                                    <img src={BACKEND_URL + photo.small} alt={photo.title} className="photo-image" />
                                    <div className='photo-meta'>
                                        <span><FaEye /> {photo.views}</span>
                                        <span><FaCalendarAlt /> {new Date(photo.created_at).toISOString().split('T')[0]}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}



export default Photos
