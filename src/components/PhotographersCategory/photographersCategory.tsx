import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import './style.css';

const PhotographersCategory = ({ setFiltered, onCategoryChange }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(-1);

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

    const fetchSelectedCategory = (id) => {
        setFiltered(true);
        setActiveCategory(id);
        onCategoryChange(id);  
    };

    return (
        <div className="categories-container">
            <h1 className="categories-heading">Categories</h1>
            <ul className="categories-list">
                <li
                    className={`category-item ${activeCategory === -1 ? "active_category" : ''}`}
                    onClick={() => {
                        setFiltered(false);
                        setActiveCategory(-1);
                        onCategoryChange(null);  
                        navigate(`/photographers?page=1`);
                    }}
                >
                    All
                </li>
                {categories.map((category) => (
                    <li
                        className={`category-item ${activeCategory === category.id ? "active_category" : ''}`}
                        key={category.id}
                        onClick={() => {
                            fetchSelectedCategory(category.id);
                            navigate(`/photographers?categoryId=${category.id}&page=1`);
                        }}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PhotographersCategory;