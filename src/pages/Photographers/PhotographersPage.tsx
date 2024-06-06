import { useSelector } from "react-redux"
import { photographers, done, getAllPhotographers } from "../../store/slices/photographers";
import { searchPhotographerPage,searchedPhotographers } from "../../store/slices/searchedPhotographerSlice";
import { useCallback, useDebugValue, useEffect, useState } from "react";
import { useCustomDispatch } from "../../customHooks/customHooks";
import LoadingGif from "../../../public/LoadingGif/loadingGif";
import { BACKEND_URL } from "../../config/config";
import './style.css';
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../customHooks/useDebounce";


const Photographers = () => {
    const photographersData = useSelector(photographers);
    const isPhotographersDone = useSelector(done);
    const dispatch = useCustomDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 1000);
    const searchedPhotographerInfo = useSelector(searchedPhotographers);

    useEffect(() => {
        dispatch(getAllPhotographers());
    }, [dispatch]);

    const handleSearch = useCallback(async () => {
        if (debouncedValue) {
            await dispatch(searchPhotographerPage(debouncedValue));
            console.log( debouncedValue); 
        }
    }, [debouncedValue, dispatch]);

    useEffect(() => {
        if (debouncedValue) {
            handleSearch();
        }
    }, [debouncedValue, handleSearch]);

    const photographersToDisplay = debouncedValue ? searchedPhotographerInfo : photographersData.data;

    return (
        <div>
            {!isPhotographersDone ? <LoadingGif /> : (
                <>
                    <div>
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button>Search</button>
                    </div>
                    <div className="photographers">
                        {photographersToDisplay?.map((photographer: any) => (
                            <div className="photographer-block" key={photographer.id} onClick={() => navigate(`/photographer/${photographer.id}`)}>
                                <div className="header">
                                    <img className="avatar" src={`${BACKEND_URL}${photographer?.avatar}`} alt={photographer?.name} />
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
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Photographers;