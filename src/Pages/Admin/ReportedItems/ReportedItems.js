import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Card from '../../../Components/Card';
import Loading from '../../Shared/Loading/Loading';

const ReportedItems = () => {
    const url = `http://localhost:5000/report`
    const { data: products, isLoading, refetch } = useQuery({
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

    console.log(products);
    const handleDelete = id => {
        fetch(`http://localhost:5000/report/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('geniusToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch()
                toast.success('Successfully deleted product')
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (<div className='overflow-y-hidden'>
        <h3 className='text-4xl text-center mt-10 font-bold'>My Product</h3>
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-10  my-10 mx-3 md:mx-10 ">

            {
                products.map((p) => <Card
                    key={p._id}
                    handleDelete={handleDelete}
                    product={p}>

                </Card>)
            }
        </div>
    </div>
    );
};

export default ReportedItems;