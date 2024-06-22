import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';
import Button from '../SmallComponents/Button/Button';

interface PaginationProps {
    paginationBtns: Array<number>,
    activePage: number,
    setActivePage: React.Dispatch<React.SetStateAction<number>>,
}

const Pagination: React.FC<PaginationProps> = ({ paginationBtns, activePage, setActivePage }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoryId = searchParams.get('categoryId') || null;

    const handlePageChange = (page: number) => {
        setActivePage(page);
        if (categoryId) {
            navigate(`/photographers?categoryId=${categoryId}&page=${page}`);
        } else {
            navigate(`/photographers?page=${page}`);
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
};

export default Pagination;