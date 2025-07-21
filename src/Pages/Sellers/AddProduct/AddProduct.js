import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GoVerified } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthCoxtext/AuthProvider';
import useTitle from '../../../Hooks/useTitle';
import useVerify from '../../../Hooks/useVerify';
import Loading from '../../Shared/Loading/Loading'

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isVerify, isVerifyLoading] = useVerify(user?.email)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()
    const imageHostKey = process.env.REACT_APP_imgbb_Key;

    useTitle('Add Product')

    useEffect(() => {

        axios
            .get("https://resell-one.vercel.app/categories")
            .then(data => setCategories(data.data))
            .catch(error => console.log(error));
    }, [])


    let condition = null
    const postTime = new Date()

    const handleAddProduct = data => {

        setIsLoading(true)

        if (data.condition === "1") {
            condition = 'Fair'
        }
        else if (data.condition === "2") {
            condition = ' Good'
        } else {
            condition = 'Excellent'
        }

        const image = data.productImg[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const productImg = imgData.data.url;

                    const productInfo = {
                        productName: data.productName,
                        marketPrice: data.marketPrice,
                        sellingPrice: data.sellingPrice,
                        area: data.area,
                        description: data.description,
                        purchaseYear: data.purchaseYear,
                        productCondition: condition,
                        categoriesId: data.category,
                        productImg: productImg,

                        sellerName: user.displayName,
                        sellerEmail: user.email,
                        sellerImg: user.photoURL,
                        sellerPhone: data.phone,
                        postTime,
                        productStatus: 'Available'

                    }
                    productSaveInDb(productInfo)
                }
            })
    }

    const productSaveInDb = (productInfo) => {
        fetch('https://resell-one.vercel.app/addproduct', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('geniusToken')}`
            },
            body: JSON.stringify(productInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIsLoading(false)
                toast.success('Successfully Product add')
                navigate('/dashboard/myproduct')
            })
    }

    if (isLoading || isVerifyLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <section className="p-6 bg-gray-100 text-gray-900">
                <form onSubmit={handleSubmit(handleAddProduct)} className="container flex flex-col mx-auto space-y-3 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Product Information</p>

                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full">
                                <label className="text-sm">Product name</label>
                                <input type="text" className="w-full rounded-md 
                                p-3 focus:ring focus:ring-opacity-75 focus:ring-green-600 border-gray-300 text-gray-900" {...register("productName",
                                    { required: "Product Name is required" }
                                )} placeholder="Product Name" />
                                {errors.productName && <p role="alert">{errors.productName?.message}</p>}
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Market Price</label>
                                <input id="marketPrice" type="number" className="w-full rounded-md focus:ring p-3 focus:ring-opacity-75 focus:ring-green-600 border-gray-300 text-gray-900" {...register("marketPrice",
                                    { required: "Market Price is required" }
                                )} placeholder="Market Price" />
                                {errors.marketPrice && <p role="alert">{errors.marketPrice?.message}</p>}
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Reselling Price</label>
                                <input id="sellingPrice" type="number" className="w-full rounded-md 
                                border-0 focus:ring p-3 focus:ring-opacity-75 focus:ring-green-600 border-gray-300 text-gray-900"{...register("sellingPrice",
                                    { required: "Reselling Price is required" }
                                )} placeholder="Selling Price" />
                                {errors.SellingPrice && <p role="alert">{errors.SellingPrice?.message}</p>}
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Purchase Date </label>
                                <input id="purchaseYear" type="date" className="w-full rounded-md 
                                border-0 focus:ring p-3 focus:ring-opacity-75 focus:ring-green-600 border-gray-300 text-gray-900" {...register("purchaseYear",
                                    { required: "Purchase Date required" }
                                )} />
                                {errors.purchaseYear && <p role="alert">{errors.purchaseYear?.message}</p>}
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Location</label>
                                <select className="w-full rounded-md 
                                border-0 focus:ring p-3 focus:ring-opacity-75 focus:ring-green-600 border-gray-300 text-gray-900" {...register("area",
                                    { required: "Location is required" }
                                )}>

                                    <option disabled selected>Select your Area</option>
                                    <option>Dhaka</option>
                                    <option>Chittagong</option>
                                    <option>Khulna</option>
                                    <option>Rajshahi</option>
                                </select>
                                {errors.area && <p role="alert">{errors.area?.message}</p>}
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Product Condition</label>
                                <fieldset className="space-y-1 w-full px-2 text-gray-800">
                                    <input type="range" className="w-full range range-primary" min="1" max="3" {...register("condition",
                                        { required: "Condition is required" }
                                    )} />
                                    <div aria-hidden="true" className="flex justify-between px-2">

                                        <span>Fair</span>
                                        <span>Good</span>
                                        <span>Excellent</span>

                                    </div>
                                </fieldset>
                                {errors.productCondition && <p role="alert">{errors.productCondition?.message}</p>}
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Category</label>
                                <select className="w-full rounded-md 
                                border-0 focus:ring p-3 focus:ring-opacity-75 focus:ring-green-600 border-gray-300 text-gray-900"{...register("category",
                                    { required: "category is required" }
                                )}>
                                    <option disabled selected>Select product Category</option>
                                    {
                                        categories.map(c => <option
                                            key={c._id}
                                            value={c._id}
                                        >{c.name}</option>)
                                    }


                                </select>
                                {errors.category && <p role="alert">{errors.category?.message}</p>}
                            </div>


                            <div className="col-span-full ">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-4 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  ">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <img src="https://img.icons8.com/sf-regular/48/737373/add-image.png" alt="" />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">
                                            Upload</span> Product Photo</p>

                                    </div>
                                    <input id="fn" type="file"
                                        multiple className='file-input file-input-ghost mx-auto' {...register("productImg",
                                            { required: "Product Image is required" }
                                        )} />
                                    {errors.productImg && <p className="text-sm text-gray-500 dark:text-red-400" role="alert">{errors.productImg?.message}</p>}
                                </label> </div>
                            <div className="col-span-full ">
                                <label className="text-sm">Description</label>
                                <textarea id="description" className="w-full h-52 p-3  rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-600 border-gray-300 text-gray-900" {...register("description",
                                    { required: "description is required" }
                                )} >

                                </textarea>
                                {errors.description && <p role="alert">{errors.description?.message}</p>}
                            </div>


                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Seller Information</p>

                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Username</label>
                                <input id="username" type="text" defaultValue={user?.displayName} readOnly className="w-full p-3 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-600 border-gray-300 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Email</label>
                                <input id="email" type="text" defaultValue={user?.email} readOnly className="w-full p-3 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-600 border-gray-300 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-sm">Phone Number</label>
                                <input id="Phone" type="text" className="w-full p-3 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-600 border-gray-300 text-gray-900" {...register("phone",
                                    { required: "Phone Number is required" }
                                )} placeholder="Phone Number" />
                                {errors.phone && <p role="alert">{errors.phone?.message}</p>}
                            </div>

                            <div className="col-span-full">
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 rounded-full ">
                                        {
                                            isVerify &&
                                            <GoVerified className='text-info absolute w-4 h-4' />
                                        }
                                        <img src={user?.photoURL} alt='' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <button type="submit" className="btn btn-primary text-white w-full">Add Product</button>
                </form>
            </section>
        </div >
    );
};

export default AddProduct;