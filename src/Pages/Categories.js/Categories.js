import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthCoxtext/AuthProvider';
import Card from '../../Components/Card';
import ConfirmationModel from '../../Components/ConfirmationModel';
import NormalCard from '../../Components/NormalCard';
import useTitle from '../../Hooks/useTitle';
import Loading from '../Shared/Loading/Loading';

const Categories = () => {
    const products = useLoaderData()
    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [productInfo, setProductInfo] = useState(null)
    const [deleteAction, setDeleteAction] = useState(false)
    const [advertiseAction, setAdvertiseAction] = useState(false)
    const [reportAction, setReportAction] = useState(false)

    useTitle('Categories')

    const closeModal = () => {
        setProductInfo(null)
    }

    useEffect(() => {

        axios
            .get("https://resell-one.vercel.app/categories")
            .then(data => setCategories(data.data))
            .catch(error => console.log(error));
    }, [])

console.log(products);

    const handleReport = id => {

        fetch(`https://resell-one.vercel.app/report/${id}`, {
            method: 'PUT',

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setProductInfo(null)
                    toast.success('Successfully Product Reported')
                }
            })

    }
    const handleAdvertise = id => {
        setLoading(true)
        fetch(`https://resell-one.vercel.app/product/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('geniusToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    setLoading(false)
                    setProductInfo(null)
                    toast.success('Successfully Advertise product')
                }
            })

    }

    const handleDelete = id => {
        setLoading(true)
        fetch(`https://resell-one.vercel.app/product/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('geniusToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setProductInfo(null)
                toast.success('Successfully deleted product')
            })
    }
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className=''>
            <div className="drawer drawer-mobile">
                <input id="category-drawer" type="checkbox" className="drawer-toggle " />
                <div className="drawer-content pt-10 ">
                    <h3 className='text-3xl md:text-5xl text-center mt-16 font-bold'>Category Name </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 text-center gap-10  my-10 mx-3 md:mx-10 '>
                        {
                            user?.email?
                            <>
                                {
                                    products.map((p) => <Card
                                        key={p._id}
                                        product={p}
                                        setLoading={setLoading}
                                        setProductInfo={setProductInfo}
                                        setDeleteAction={setDeleteAction}
                                        setAdvertiseAction={setAdvertiseAction}
                                        setReportAction={setReportAction}
                                    >

                                    </Card>)
                                }
                            </>
                        :
                        <>
                            {
                                products.map((p) => <NormalCard
                                    key={p._id}
                                    product={p}
                                >

                                </NormalCard>)
                            }
                        </>
                        }
                    </div>
                </div>

                <div className="drawer-side pt-24 ">
                    <label htmlFor="category-drawer" className="drawer-overlay"></label>
                    <div className=" p-4 w-80 bg-gray-100 lg:bg-transparent text-base-content">
                        <label htmlFor="category-drawer" className=" drawer-button lg:hidden text-left text-primary pl-7 m-0  rounded-xl bg-gray-100 absolute top-[40%]   -right-16 "><TbLayoutSidebarRightCollapse className='text-6xl rounded-xl rounded-l-none shadow-l shadow-xl' /></label>
                        <div className='grid gap-5  grid-cols-1 text-center'>
                            {
                                categories.map(category =>
                                    <Link key={category._id} to={`/categories/${category._id}`} className={`card   text-primary-content ${category.bg}`} >
                                        <div className="card-body  text-canter text-secondary-content">
                                           
                                            <h5 className='text-md font-medium'>{category.name}</h5>
                                        </div>
                                    </Link >
                                )}

                        </div>
                    </div>

                </div>
            </div>

            {productInfo &&
                <ConfirmationModel
                    closeModal={closeModal}
                    info={productInfo}

                    deleteAction={deleteAction}
                    handleDelete={handleDelete}

                    advertiseAction={advertiseAction}
                    handleAdvertise={handleAdvertise}

                    handleReport={handleReport}
                    reportAction={reportAction}
                ></ConfirmationModel>
            }

        </div>
    );
};

export default Categories;