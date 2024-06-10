import { useSelector } from "react-redux"
import { photographers, done, getAllPhotographers } from "../../store/slices/photographers";
import { searchPhotographerPage, searchedPhotographers } from "../../store/slices/searchedPhotographerSlice";
import { useCallback, useDebugValue, useEffect, useState } from "react";
import { useCustomDispatch } from "../../customHooks/customHooks";
import LoadingGif from "../../../public/LoadingGif/loadingGif";
import { BACKEND_URL } from "../../config/config";
import './style.css';
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "../../customHooks/useDebounce";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";


const Photographers = () => {
    const photographersData = useSelector(photographers);
    const isPhotographersDone = useSelector(done);
    const dispatch = useCustomDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 500);
    const searchedPhotographerInfo = useSelector(searchedPhotographers);
    const {page} = useParams()
    const [activePage, setActivePage] = useState(Number(page) || 1)

    const definePaginationBtns = () => {
        const pageNumbers = []
        for (let i = 1; i <= photographersData.last_page; i++) {
            pageNumbers.push(i)
        }
        return pageNumbers
    }

    const handleSearch = useCallback(async () => {
        if (debouncedValue) {
            await dispatch(searchPhotographerPage(debouncedValue));
            console.log(debouncedValue);
        }
    }, [debouncedValue, dispatch]);

    useEffect(() => {
        dispatch(getAllPhotographers(activePage));
    }, [dispatch, activePage]);

    useEffect(() => {
        if (debouncedValue) {
            handleSearch();
        }
    }, [debouncedValue, handleSearch]);

    const photographersToDisplay = debouncedValue ? searchedPhotographerInfo : photographersData.data;


    const paginationBtns = definePaginationBtns()

    return (
        <div className="photographers_page_div">
            {!isPhotographersDone ? <LoadingGif /> : (
                <>
                    <Search
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
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
                    <Pagination
                        activePage={activePage}
                        paginationBtns={paginationBtns}
                        setActivePage={setActivePage}
                    />
                </>
            )}
        </div>
    );
};

export default Photographers;