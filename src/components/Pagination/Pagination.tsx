import React, { useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import './style.css'
import { useDispatch } from 'react-redux'
import { getAllPhotographers } from '../../store/slices/photographers'

interface PaginationProps {
    paginationBtns: Array<number>,
    activePage: number,
    setActivePage: React.Dispatch<React.SetStateAction<number>>,
}

const Pagination: React.FC<PaginationProps> = ({paginationBtns, activePage, setActivePage}) => {
    const navigate = useNavigate();
    console.log(paginationBtns)

    useEffect(() => {
        navigate(`/photographers/${activePage}`);
    }, [activePage, navigate]);

    return (
        <div className="pagination_div">
        {paginationBtns.map((page, i) => (
            <button
                className={activePage === page ? "active_page_btn" : "page_btn"}
                onClick={() => setActivePage(page)}
                key={i}
            >
                {page}
            </button>
        ))}
    </div>
    )
}

export default Pagination
