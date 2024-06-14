import axios from "axios";
import React, { useState,useEffect } from "react";
import { useCustomDispatch } from "../../customHooks/customHooks";
import { searchSelectedCategory } from "../../store/slices/categorizedPhotographers";
import { getAllPhotographers } from "../../store/slices/photographers";

import './style.css'

const PhotographersCategory: React.FC = ({setFiltered, activePage}) =>{
    const [categories,setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(-1)
    
   
    const dispatch = useCustomDispatch()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://pinetech.org/api/all-categories");
                setCategories(response.data.data);
            } catch (error) {
                console.log(error);
            } 
        };
        fetchCategories();
    }, []);

    const fetchSelectedCategory = async (id) => {
        try {
          dispatch(searchSelectedCategory(id))
        } catch (error) {
            console.log(error);
        } 
    };

    //console.log(categories)
    return (
        <div className="categories-container">
        <h1 className="categories-heading">Categories</h1>
        <ul className="categories-list">
            <li className={`category-item ${activeCategory == -1 ? "active_category" : 'category'}`} onClick={() => {
                setFiltered(false)
                setActiveCategory(-1)
                dispatch(getAllPhotographers(activePage))
            }}>
                All
            </li>
            {categories.map((category, index) => (
                <li className={`category-item ${activeCategory == index ? "active_category" : "category"}`} key={category.id} onClick={()=>{
                    setFiltered(true)
                    setActiveCategory(index)
                    fetchSelectedCategory(category.id)
                }}>
                    {category.name}
                </li>
            ))}
        </ul>
    </div>
    )
}

export default PhotographersCategory;