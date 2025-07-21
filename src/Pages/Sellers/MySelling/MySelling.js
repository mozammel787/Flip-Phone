import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthCoxtext/AuthProvider';
import useTitle from '../../../Hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const MySelling = () => {
    const { user, loading } = useContext(AuthContext)
    useTitle('My Sell')
    const url = `https://resell-one.vercel.app/mysell?email=${user?.email}`
    const { data: products, isLoading } = useQuery({
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

    // console.log(user?.email);
    if (isLoading || loading) {
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
                            <th>Buyer Email</th>
                            <th>Payment Status</th>
                            <th>Price</th>
                            <th>Transaction Id</th>

                        </tr>
                    </thead>

                    
                        <tbody>

                            {
                                products.map((p, i) => <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>
                                        {p.productName}
                                    </td>
                                    <td>
                                        {p.buyerEmail}
                                    </td>


                                    <th>
                                        {p?.paid ?
                                            <button className="btn btn-primary btn-xs" >paid</button>
                                            :
                                            <button className="btn btn-xs">Booked</button>
                                        }
                                    </th>
                                    <td>{p.price}
                                    </td>
                                    <td>{p.transactionId}
                                    </td>

                                </tr>)
                            }

                        </tbody>
               

                </table>
            </div>

        </div>
    );
};

export default MySelling;