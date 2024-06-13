import axios from "axios";
import { useState,useEffect } from "react";
import { useCustomDispatch } from "../../customHooks/customHooks";
import { searchSelectedCategory } from "../../store/slices/categorizedPhotographers";



const PhotographersCategory = () =>{
    const [categories,setCategories] = useState([]);
    
   
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
            {categories.map((category) => (
                <li className="category-item" key={category.id} onClick={()=>fetchSelectedCategory(category.id)}>
                    {category.name}
                </li>
            ))}
        </ul>
    </div>
    )
}

export default PhotographersCategory;