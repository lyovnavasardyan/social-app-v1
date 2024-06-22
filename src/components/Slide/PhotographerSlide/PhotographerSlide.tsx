import React from 'react'
import Slider from 'react-slick';
import { BACKEND_URL } from '../../../config/config';

import './style.css'

const PhotographerSlide: React.FC = ({ slidePhotographers }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };
    return (
        <div className='photographers_slide_div'>
            <Slider {...settings}>
            {
                slidePhotographers?.map(photogrpaher => {
                    return <img
                        key={photogrpaher.id}
                        src={BACKEND_URL + photogrpaher.avatar}
                        className='slide-photographer'
                        alt=""
                    />
                })
            }
        </Slider>
        </div>
    )
}

export default PhotographerSlide
