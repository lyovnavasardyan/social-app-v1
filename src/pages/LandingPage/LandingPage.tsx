
import React, { useEffect } from 'react'

import './style.css'
import Slide from '../../components/Slide/Slide'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPhotos, photos } from '../../store/slices/allUserPhotosSlice'
import PhotosSlide from '../../components/Slide/PhotosSlide/PhotosSlide'
import { getAllPhotographers, photographers } from '../../store/slices/photographers'
import PhotographerSlide from '../../components/Slide/PhotographerSlide/PhotographerSlide'

const LandingPage: React.FC = () => {
  const dispatch = useDispatch()

  const allPhotos = useSelector(photos)
  const allPhotographers = useSelector(photographers)

  useEffect(() => {
    dispatch(getAllPhotos())
    dispatch(getAllPhotographers({page: 1}))
  }, [])
  
  const slidePhotos = allPhotos?.data?.filter((photo, index) => index < 5)
  const slidePhotographers = allPhotographers?.data?.filter((photo, index) => index < 15)
  
  return (
    <div className="landing_page_div">
      <Slide size={'large'} title={'Most viewed photos'}>
        <PhotosSlide slidePhotos={slidePhotos} />
      </Slide>
      <Slide size={'small'} title={'Photographers of month'}>
        <PhotographerSlide slidePhotographers={slidePhotographers} />
      </Slide>
    </div>
  )
}

export default LandingPage
