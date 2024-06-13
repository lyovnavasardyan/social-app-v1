import { useSelector } from "react-redux"
import { photographers, done, getAllPhotographers } from "../../store/slices/photographers";
import { searchPhotographerPage, searchedPhotographers } from "../../store/slices/searchedPhotographerSlice";
import { useCallback, useEffect, useState } from "react";
import { useCustomDispatch } from "../../customHooks/customHooks";
import LoadingGif from "../../../public/LoadingGif/loadingGif";
import { useParams } from "react-router-dom";
import { useDebounce } from "../../customHooks/useDebounce";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";
import Photographer from "../../components/Photographer/Photographer";

import './style.css';

const Photographers = () => {
    const photographersData = useSelector(photographers);
    const isPhotographersDone = useSelector(done);
    const dispatch = useCustomDispatch();
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 500);
    const searchedPhotographerInfo = useSelector(searchedPhotographers);
    const { page } = useParams()
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
    }, [debouncedValue]);

    useEffect(() => {
        dispatch(getAllPhotographers(activePage));
    }, [activePage]);

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
                            <Photographer photographer={photographer} />
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