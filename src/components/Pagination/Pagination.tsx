import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import Button from '../SmallComponents/Button/Button';


interface PaginationProps {
    paginationBtns: Array<number>,
    activePage: number,
    setActivePage: React.Dispatch<React.SetStateAction<number>>,
}

const Pagination: React.FC<PaginationProps> = ({ paginationBtns, activePage, setActivePage }) => {
    const navigate = useNavigate();
    console.log(paginationBtns)

    useEffect(() => {
        navigate(`/photographers/${activePage}`);
    }, [activePage, navigate]);

    return (
        <div className="pagination_div">
            {paginationBtns.map((page, i) => (
                <Button
                    className={activePage === page ? "active_page_btn" : "page_btn"}
                    onClick={() => setActivePage(page)}
                    key={i}
                    usage='pagination'
                    width='30px'
                    height='30px'
                    text={page}
                />
            ))}
        </div>
    )
}

export default Pagination
