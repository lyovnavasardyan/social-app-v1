import React from 'react'
import { BACKEND_URL } from '../../../config/config'
import { useNavigate } from 'react-router-dom'

import './style.css'
import Slider from 'react-slick'

const PhotosSlide: React.FC = ({ slidePhotos }) => {
    const navigate = useNavigate()

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500
      };
    return (
        <Slider {...settings}>
            {
                slidePhotos?.map(photo => {
                    return <img onClick={() => navigate(`/photographer/${photo.user.id}`)} className="slide-photo" key={photo.id} src={BACKEND_URL + photo.small} alt="" />
                })
            }
        </Slider>

    )
}
export default PhotosSlide
