import { useSelector } from "react-redux"
import { BACKEND_URL } from "../../config/config"
import './style.css'
import { modalPhotos } from "../../store/slices/modalPhotoSlice"

const RandomPhotos = () => {
       const randomPhotos = useSelector(modalPhotos)

       return (
              <div className="random-photos">
                     {randomPhotos?.map((photo) => (
                            <img key={photo.id} src={BACKEND_URL + photo.small} alt="random-photos" className="random-photo" />
                     ))}
              </div>
       )
}

export default RandomPhotos;