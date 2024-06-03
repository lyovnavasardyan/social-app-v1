import React, { useEffect } from 'react'
import './style.css';
import { useCustomDispatch } from '../../customHooks/customHooks'
import { done, getAllPhotos, photos } from '../../store/slices/allUserPhotosSlice'
import { useSelector } from 'react-redux'
import LoadingGif from '../../../public/LoadingGif/loadingGif'
import { BACKEND_URL } from '../../config/config'
import { FaEye, FaCalendarAlt } from 'react-icons/fa';
import { fetchData } from '../../api/api';
import ClickedPhotographer from '../ClickedPhotographer/clickedPhotographer';
import { useNavigate } from 'react-router-dom';

const Photos = () => {
    const photosData = useSelector(photos);
    const isPhotosDone = useSelector(done);
    const dispatch = useCustomDispatch();
    const navigate = useNavigate();    

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [])

    console.log(photosData);

    const data = {
    userId : 450
    }
    
    const testing = async()=>{
        const response = await fetchData.getChoosenPhotographer(data);
        console.log(response.data)
        return response.data;
    }

    
       
     

    return (
        <div>
            {
                !isPhotosDone ? <LoadingGif /> : (
                    
                    <div className="photos">
                        <button onClick={testing}>
                            TEST BUTTON
                        </button>
                        {
                            photosData?.data?.map((photo) => (
                                
                                <div className="photo" key={photo.id}>
                                    <div className="photo-header">
                                        <img src={BACKEND_URL + photo?.user?.avatar} className="avatar" alt={photo?.user?.name} onClick={()=>
                                            navigate(`/photographer/${photo.user.id}`)
                                        }/>
                                        <h5>{photo?.user?.name}</h5>
                                    </div>
                                    <img src={BACKEND_URL + photo.small} alt={photo.title} className="photo-image" onClick={()=>
                                            navigate(`/photographer/${photo.user.id}`)
                                        } />
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
