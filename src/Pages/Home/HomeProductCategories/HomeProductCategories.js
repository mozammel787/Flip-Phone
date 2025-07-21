import React, { useEffect, useState } from 'react';
import axios from "axios";
import CategoriesCard from './CategoriesCard';
const HomeProductCategories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {

        axios
            .get("https://resell-one.vercel.app/categories")
            .then(data => setCategories(data.data))
            .catch(error => console.log(error));
    }, [])

    return (
        <div className='bg-gray-50'>
            <div className='container mx-auto py-32 text-center '>
                <h2 className='text-3xl md:text-4xl  mt-10 mb-2 font-bold'>Shop by Brand
                </h2>
                <p className='text-gray-600 mb-12'>Find your favorite smartphone brands with the latest models and best deals

                </p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center'>
                    {
                        categories.map(c => <CategoriesCard
                            key={c._id}
                            category={c}
                        ></CategoriesCard>)
                    }

                </div>
            </div>
        </div>
    );
};

export default HomeProductCategories;