import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../AuthCoxtext/AuthProvider';
import NormalCard from '../../Components/NormalCard';
import Loading from '../Shared/Loading/Loading';

const AllProducts = () => {
    const { loading } = useContext(AuthContext);






    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('https://resell-one.vercel.app/allproducts')
                const data = await res.json()
                return data
            }
            catch (err) {

            }
        }
    })


    if (isLoading || loading) {
        return <Loading></Loading>
    }

    return (
        <>
            <div className='overflow-y-hidden mt-10 container mx-auto'>
                <h3 className='text-4xl text-center mt-10 font-bold'>All Product</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10  my-10 mx-3  ">

                    {
                        products.map((p) => <NormalCard key={p._id}
                            product={p}
                        >

                        </NormalCard>)
                    }
                </div>
            </div>
        </>
    );
};

export default AllProducts;