import { useSelector } from "react-redux"
import { photographers, done, getAllPhotographers } from "../../store/slices/photographers";
import { useCallback, useDebugValue, useEffect, useState } from "react";
import { useCustomDispatch } from "../../customHooks/customHooks";
import LoadingGif from "../../../public/LoadingGif/loadingGif";
import { BACKEND_URL } from "../../config/config";
import './style.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "../../customHooks/useDebounce";


const Photographers = () => {

    const photographersData = useSelector(photographers);
    const isPhotographersDone = useSelector(done);
    const dispatch = useCustomDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState();
    const debouncedValue = useDebounce(searchValue,1000);
    // TODO remove this and search data send to redux
    const [searchedPhotographers, setSearchedPhotographers] = useState([]);

    useEffect(() => {
        dispatch(getAllPhotographers())
    }, [])



    const handleSearch = useCallback(async()=>{
        await axios.get(`https://pinetech.org/api/photographer/search?search=${debouncedValue }`).then((res) => {
            console.log(res);
            setSearchedPhotographers(res.data.data.data)
        })
    },[debouncedValue])
    

    useEffect(()=>{
        if(debouncedValue) {
            handleSearch();
        }
    },[debouncedValue,searchValue])


    return (
        <div>
            {
                !isPhotographersDone ? <LoadingGif /> : (
                    <>
                        <div>
                            <input type="text" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
                            <button>Search</button>
                        </div>
                        <div className="photographers">

                            {
                                // TODO: change this from redux
                                searchedPhotographers?.map((photographer: any) => (
                                    <div className="photographer-block" key={photographer.id} onClick={() =>
                                        navigate(`/photographer/${photographer.id}`)
                                    }>
                                        <div className="header">
                                            <img className="avatar" src={BACKEND_URL + photographer?.avatar} alt={photographer?.name} />
                                            <div className="info">
                                                <h5 className="name">{photographer?.name}</h5>
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
                    </>
                )
            }
        </div>
    )
}

export default Photographers;