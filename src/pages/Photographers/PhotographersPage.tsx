import { useSelector } from "react-redux"
import { photographers, done, getAllPhotographers,selectedCategory } from "../../store/slices/photographers";
import { searchPhotographerPage, searchedPhotographers } from "../../store/slices/searchedPhotographerSlice";
import { useCallback, useEffect, useState } from "react";
import { useCustomDispatch } from "../../customHooks/customHooks";
import LoadingGif from "../../../public/LoadingGif/loadingGif";
import { useParams } from "react-router-dom";
import { useDebounce } from "../../customHooks/useDebounce";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";
import PhotographersCategory from "../../components/PhotographersCategory/photographersCategory";
import Photographer from "../../components/Photographer/Photographer";
import { useNavigate } from "react-router-dom";

import './style.css';

const Photographers = () => {
    const photographersData = useSelector(photographers);
    const selectCategory = useSelector(selectedCategory);
    const isPhotographersDone = useSelector(done);
    const searchedPhotographerInfo = useSelector(searchedPhotographers);
    const dispatch = useCustomDispatch();
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 500);
    const { page, categoryId } = useParams();
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(Number(page) || 1);
    const [filtered, setFiltered] = useState(false);

    useEffect(() => {
        setActivePage(Number(page) || 1);
    }, [page]);

    useEffect(() => {
        if (categoryId !== undefined && activePage !== undefined) {
            dispatch(getAllPhotographers({ id: categoryId, page: activePage }));
        } else if (activePage !== undefined) {
            dispatch(getAllPhotographers({ page: activePage }));
        }
    }, [activePage, filtered, categoryId, dispatch]);

    const handleSearch = useCallback(async () => {
        if (debouncedValue) {
            dispatch(searchPhotographerPage(debouncedValue));
        }
    }, [debouncedValue, dispatch]);

    useEffect(() => {
        if (debouncedValue) {
            handleSearch();
        }
    }, [debouncedValue, handleSearch]);

    const photographersToDisplay = () => {
        if (debouncedValue && !selectCategory) {
            return searchedPhotographerInfo;
        } else if (debouncedValue && selectCategory) {
            return searchedPhotographerInfo;
        } else if (!debouncedValue && selectCategory) {
            return selectCategory.data;
        } else {
            return photographersData.data;
        }
    };

    const definePaginationBtns = () => {
        const pageNumbers = [];
        for (let i = 1; i <= photographersData.last_page; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const paginationBtns = definePaginationBtns();

    const handleCategoryChange = (categoryId:number) => {
        setActivePage(1);  
        setFiltered(true);
        if (categoryId) {
            navigate(`/photographers/${categoryId}/1`);
        } else {
            navigate(`/photographers/1`);
        }
    };

    return (
        <div className="main-container">
            <PhotographersCategory
                setFiltered={setFiltered}
                activePage={activePage}
                onCategoryChange={handleCategoryChange}
            />
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
                            {photographersToDisplay()?.map((photographer:any) => (
                                <Photographer key={photographer.id} photographer={photographer} />
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
        </div>
    );
};

export default Photographers;