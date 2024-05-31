import React, { useEffect } from 'react'

import './style.css'
import { useCustomDispatch } from '../../customHooks/customHooks'
import { done, getAllPhotos, photos } from '../../store/slices/allUserPhotosSlice'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import LoadingGif from '../../../public/LoadingGif/loadingGif'
import { BACKEND_URL } from '../../config/config'

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
                                    <img src={BACKEND_URL + photo.small} alt="" />
                                    <div style={{display: 'flex'}}>
                                        <img src={BACKEND_URL+photo?.user?.avatar} style={{width: 100, height: 100, borderRadius: '50%', objectFit: 'cover'}} alt="" />
                                        <h5>{photo?.user?.name}</h5>
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
