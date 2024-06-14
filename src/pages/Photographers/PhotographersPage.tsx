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
import PhotographersCategory from "../../components/PhotographersCategory/photographersCategory";
import { selectedCategory } from "../../store/slices/categorizedPhotographers";
import Photographer from "../../components/Photographer/Photographer";

import './style.css';

const Photographers = () => {
    const photographersData = useSelector(photographers);
    const selectCategory = useSelector(selectedCategory)
    const isPhotographersDone = useSelector(done);
    const dispatch = useCustomDispatch();
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 500);
    const searchedPhotographerInfo = useSelector(searchedPhotographers);
    const { page } = useParams()
    const [activePage, setActivePage] = useState(Number(page) || 1)
    const [filtered, setFiltered] = useState(false)

    const definePaginationBtns = () => {
        const pageNumbers = [];
        for (let i = 1; i <= photographersData.last_page; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const handleSearch = useCallback(async () => {
        if (debouncedValue) {
            dispatch(searchPhotographerPage(debouncedValue));
            console.log(debouncedValue);
        }
    }, [debouncedValue]);

    useEffect(() => {
        dispatch(getAllPhotographers(activePage));
        window.scrollTo(0, 0)
    }, [activePage]);

    useEffect(() => {
        if (debouncedValue) {
            handleSearch();
        }
    }, [debouncedValue, page]);

    // const photographersToDisplay = debouncedValue ? searchedPhotographerInfo : photographersData.data;

    const photographersToDisplay = () => {
        if (debouncedValue && !selectCategory) {
            return searchedPhotographerInfo
        } else if (debouncedValue && selectCategory) {
            return searchedPhotographerInfo
        } else if (!debouncedValue && selectCategory) {
            return selectCategory.data
        } else {
            return photographersData.data

        }
    }

    const paginationBtns = definePaginationBtns();

    return (
        <div className="main-container">
            <PhotographersCategory setFiltered={setFiltered} activePage={activePage} />
            <div className="photographers-content">
                {!isPhotographersDone ? (
                    <LoadingGif />
                ) : (
                    <>
                        <Search
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                        />
                        <div className="photographers">
                            {(
                                photographersToDisplay()?.map((photographer) => (
                                    <Photographer key={photographer.id} photographer={photographer} />
                                ))
                            )}
                        </div>
                        {/* {!filtered && ( */}
                            <Pagination
                                activePage={activePage}
                                paginationBtns={paginationBtns}
                                setActivePage={setActivePage}
                            />
                        {/* )} */}
                    </>
                )}
            </div>
        </div>
    );
};

export default Photographers;