import { useSelector } from "react-redux"
import { photographers,done,getAllPhotographers } from "../../store/slices/photographers";
import { useEffect } from "react";
import { useCustomDispatch } from "../../customHooks/customHooks";
import LoadingGif from "../../../public/LoadingGif/loadingGif";
import { BACKEND_URL } from "../../config/config";
import './style.css';
import { useNavigate } from "react-router-dom";


const Photographers = () =>{

    const photographersData = useSelector(photographers);
    const isPhotographersDone = useSelector(done);
    const dispatch = useCustomDispatch();
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getAllPhotographers())
    },[])

    console.log(photographersData)

    return (
        <div>
            {
                !isPhotographersDone ? <LoadingGif /> : (
                    <div className="photographers">
                        {
                            photographersData?.data?.map((photographer) => (
                                <div className="photographer-block" key={photographer.id} onClick={()=>
                                    navigate(`/photographer/${photographer.id}`)
                                }>
                                    <div className="header">
                                        <img className="avatar" src={BACKEND_URL + photographer?.avatar} alt={photographer?.name} />
                                        <div className="info">
                                            <h5>{photographer?.name}</h5>
                                            <h5>{photographer?.email}</h5>
                                            <h5>
                                                <a href={photographer?.fb} target="_blank" rel="noopener noreferrer">
                                                    Facebook Profile
                                                </a>
                                            </h5>
                                        </div>
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

export default Photographers;