import React from 'react'

import './style.css'
import { BACKEND_URL } from '../../config/config';
import { IoClose } from 'react-icons/io5';

interface UserInfoInt {
    name: string
}

interface PhotosInfoInt {
    user: UserInfoInt,
    views: string,
    created_at: string,
    small: string
}

interface PhotoInt {
    photoInfo: PhotosInfoInt,
    setPhotoModalInfo: any
}

const PhotoModal: React.FC<PhotoInt> = ({ photoInfo, setPhotoModalInfo }) => {
    console.log(photoInfo);
    
  return (
    <div className='photo_modal_div'>
        <IoClose onClick={() => setPhotoModalInfo({isOpen: false, photoInfo})} className='close' />
        <div className="photo_info_div">
            <h2>{photoInfo.user.name}</h2>
            <h4>{photoInfo.views} views</h4>
            <h4>Created at {photoInfo.created_at.slice(0, 10)}</h4>
        </div>
        <img src={BACKEND_URL + photoInfo.small} alt="photo" />

    </div>
  )
}

export default PhotoModal
