import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../../../Components/Card';
import ConfirmationModel from '../../../Components/ConfirmationModel';
import useTitle from '../../../Hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const ReportedItems = () => {
    const [productInfo, setProductInfo] = useState(null)
    const [deleteAction, setDeleteAction] = useState(false)

    useTitle('Reported Items')

    const closeModal = () => {
        setProductInfo(null)
    }

    const url = `https://resell-one.vercel.app/report`
    const { data: products =[], isLoading, refetch } = useQuery({
        queryKey: ['products',],
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

    // console.log(products);
    const handleDelete = id => {
        fetch(`https://resell-one.vercel.app/report/${id}`, {
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
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <>
            <div className='overflow-y-hidden'>
                <h3 className='text-4xl text-center mt-10 font-bold'>Report Product</h3>
                <div className="grid grid-cols-1  lg:grid-cols-2 gap-10  my-10 mx-3 md:mx-10 ">
                    {
                        products.map((p) => <Card
                            key={p._id}
                            product={p}
                            setProductInfo={setProductInfo}
                            setDeleteAction={setDeleteAction}>

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
                ></ConfirmationModel>
            }
        </>
    );
};

export default ReportedItems;