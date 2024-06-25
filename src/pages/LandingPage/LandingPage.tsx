
import React, { useEffect } from 'react'

import './style.css'
import Slide from '../../components/Slide/Slide'
import { useSelector } from 'react-redux'
import { getAllPhotos, photos } from '../../store/slices/allUserPhotosSlice'
import PhotosSlide from '../../components/Slide/PhotosSlide/PhotosSlide'
import { getAllPhotographers, photographers } from '../../store/slices/photographers'
import PhotographerSlide from '../../components/Slide/PhotographerSlide/PhotographerSlide'
import { useCustomDispatch } from '../../customHooks/customHooks'

const LandingPage: React.FC = () => {
  const dispatch = useCustomDispatch()

  const allPhotos = useSelector(photos)
  const allPhotographers = useSelector(photographers)

  useEffect(() => {
    dispatch(getAllPhotos())
    dispatch(getAllPhotographers({page: 1}))
  }, [])
  
  const slidePhotos = allPhotos?.data?.filter((photo: object, index: number) => index < 5)
  const slidePhotographers = allPhotographers?.data?.filter((photo: object, index: number) => index < 15)
  
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
