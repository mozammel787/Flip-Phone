import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModel from '../../../Components/ConfirmationModel';
import useTitle from '../../../Hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const AllSeller = () => {
    const [info, setInfo] = useState(null)
    const [userDeleteAction, setUserDeleteAction] = useState(false)
    const [sellerVerifyAction, setSellerVerifyAction] = useState(false)
    useTitle('All Seller')
    const closeModal = () => {
        setInfo(null)
    }

    const { data: sellers, isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch('https://resell-one.vercel.app/sellers', {
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

    const handleVerified = id => {
        fetch(`https://resell-one.vercel.app/sellers/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('geniusToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    setInfo(null)
                    toast.success('Successfully verified seller')
                }
            })

    }

    const handleDeleteUser = id => {
        fetch(`https://resell-one.vercel.app/sellers/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('geniusToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                refetch()
                setInfo(null)
                toast.success('Successfully deleted seller')
            })
    }
    const sellerVerify = (seller) => {
        setInfo(seller);
        setUserDeleteAction(false)
        setSellerVerifyAction(true)
    }
    const userDelete = (seller) => {
        setInfo(seller);
        setSellerVerifyAction(false)
        setUserDeleteAction(true)
    }

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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Add verified</th>
                            <th>Delete</th>
                           
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sellers.map((seller, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={seller.photoURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{seller.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {seller.email}
                                </td>

                                <th>
                                    {seller?.verified ?
                                        <button className="btn btn-primary btn-xs" >verified</button>
                                        :
                                        <label htmlFor="action-modal" onClick={() => sellerVerify(seller)} className="btn btn-secondary btn-xs">Add verified</label>
                                    }
                                </th>
                                <th>
                                    <label htmlFor="action-modal" onClick={() => userDelete(seller)} className="btn btn-accent btn-xs">Delete</label>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
            {info &&
                <ConfirmationModel
                    closeModal={closeModal}
                    info={info}

                    sellerVerifyAction={sellerVerifyAction}
                    handleVerified={handleVerified}

                    userDeleteAction={userDeleteAction}
                    handleDeleteUser={handleDeleteUser}

                ></ConfirmationModel>
            }
        </div>
    );
};

export default AllSeller;