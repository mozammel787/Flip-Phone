import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../AuthCoxtext/AuthProvider';
import Card from '../../../Components/Card';
import ConfirmationModel from '../../../Components/ConfirmationModel';
import useTitle from '../../../Hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const MyProduct = () => {
    const { user, loading } = useContext(AuthContext);

    const [productInfo, setProductInfo] = useState(null)
    const [deleteAction, setDeleteAction] = useState(false)
    const [advertiseAction, setAdvertiseAction] = useState(false)

    useTitle('My Product')

    const closeModal = () => {
        setProductInfo(null)
    }

    const url = `https://resell-one.vercel.app/product?email=${user?.email}`
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(url, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('geniusToken')}`
                    }
                })
                const data = await res.json()
                return data
            }
            catch (err) {

            }
        }
    })

    const handleAdvertise = id => {
        fetch(`https://resell-one.vercel.app/product/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('geniusToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    refetch()
                    setProductInfo(null)
                    toast.success('Successfully Advertise product')
                }
            })

    }
    // console.log(products);
    const handleDelete = id => {
        fetch(`https://resell-one.vercel.app/product/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('geniusToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                refetch()
                setProductInfo(null)
                toast.success('Successfully deleted product')
            })
    }
    if (isLoading || loading) {
        return <Loading></Loading>
    }

    console.log(productInfo, deleteAction);
    return (
        <>
            <div className='overflow-y-hidden'>
                <h3 className='text-4xl text-center mt-10 font-bold'>My Product</h3>
                <div className="grid grid-cols-1  lg:grid-cols-2 gap-10  my-10 mx-3 md:mx-10 ">

                    {
                        products.map((p) => <Card key={p._id}
                            product={p}
                            setProductInfo={setProductInfo}
                            setDeleteAction={setDeleteAction}
                            setAdvertiseAction={setAdvertiseAction}
                        >

                        </Card>)
                    }
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
                ></ConfirmationModel>
            }
        </>
    );
};

export default MyProduct;