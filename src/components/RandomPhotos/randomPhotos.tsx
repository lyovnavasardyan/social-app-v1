import { BACKEND_URL } from "../../config/config"
import './style.css'

const RandomPhotos = ({ randomPhotoData }) => {

       return (
              <div className="random-photos">
                     {randomPhotoData?.data?.map((photo) => (
                            <img src={BACKEND_URL + photo.small} alt="random-photos" className="random-photo" />
                     ))}
              </div>
       )
}

export default RandomPhotos;