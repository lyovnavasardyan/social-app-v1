import React from 'react'

import './style.css'
import { useDispatch } from 'react-redux'
import { getAllPhotographers } from '../../store/slices/photographers'

interface PaginationProps {
    paginationBtns: Array<number>,
    activePage: number,
    setActivePage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<PaginationProps> = ({paginationBtns, activePage, setActivePage}) => {
    const dispatch = useDispatch()

    return (
        <div className="pagination_div">
            {
                paginationBtns.map((page, i) => {
                    return <button
                        className={activePage == page ? "active_page_btn" : "page_btn"}
                        onClick={() => {
                            dispatch(getAllPhotographers(page))
                            setActivePage(page)
                        }} key={i}>{page}</button>
                })
            }
        </div>
    )
}

export default Pagination
