import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import Button from '../SmallComponents/Button/Button';
import { useParams } from 'react-router-dom';


interface PaginationProps {
    paginationBtns: Array<number>,
    activePage: number,
    setActivePage: React.Dispatch<React.SetStateAction<number>>,
}

const Pagination: React.FC<PaginationProps> = ({ paginationBtns, activePage, setActivePage }) => {
    const navigate = useNavigate();
    const { categoryId } = useParams();

    const handlePageChange = (page: number) => {
        setActivePage(page);
        if (categoryId) {
            navigate(`/photographers/${categoryId}/${page}`);
        } else {
            navigate(`/photographers/${page}`);
        }
    };

    return (
        <div className="pagination_div">
            {paginationBtns.map((page, i) => (
                <Button
                    className={activePage === page ? "active_page_btn" : "page_btn"}
                    onClick={() => handlePageChange(page)}
                    key={i}
                    usage='pagination'
                    width='30px'
                    height='30px'
                    text={page}
                />
            ))}
        </div>
    );
}

export default Pagination;