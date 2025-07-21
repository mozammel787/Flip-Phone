import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useTitle from '../../../Hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const AllSelling = () => {

    const { data: product, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('https://resell-one.vercel.app/allselling',
                 {
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
console.log(product);
    useTitle('All Sell')

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='mt-10'>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Product Name</th>
                            <th>Seller Email</th>
                            <th>Buyer Email</th>
                            <th>Price</th>
                            <th>Payment Status</th>

                        </tr>
                    </thead>

                    {
                        product.length &&
                        <tbody>

                            {
                                product.map((p, i) => <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>
                                        {p.productName}
                                    </td>
                                    <td>
                                        {p.sellerEmail}
                                    </td>
                                    <td>
                                        {p.buyerEmail}
                                    </td>
                                    <td>
                                        $ {p.price}
                                    </td>

                                    <th>
                                        {p?.paid ?
                                            <button className="btn btn-primary btn-xs" >paid</button>
                                            :
                                            <button className="btn btn-xs">Booked</button>
                                        }
                                    </th>

                                </tr>)
                            }

                        </tbody>
                    }

                </table>
            </div>

        </div>
    );
};

export default AllSelling;