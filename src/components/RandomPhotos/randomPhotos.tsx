import { useDispatch, useSelector } from "react-redux"
import { BACKEND_URL } from "../../config/config"
import './style.css'
import { getRandomPhotos, modalPhotos } from "../../store/slices/modalPhotoSlice"
import React from "react"

const RandomPhotos: React.FC = ({ setPhotoModalInfo }) => {
       const randomPhotos = useSelector(modalPhotos)

       const dispatch = useDispatch()

       return (
              <div className="random-photos">
                     {randomPhotos?.map((photo) => (
                            <img onClick={() => {
                                   setPhotoModalInfo({ photoData: photo });
                                   dispatch(getRandomPhotos({ id: photo.id, categoryId: photo.categories[0].id }))
                            }}
                                   key={photo.id}
                                   src={BACKEND_URL + photo.small}
                                   alt="random-photos" className="random-photo" />
                     ))}
              </div>
       )
}

export default RandomPhotos;