import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModel from '../../../Components/ConfirmationModel';
import useTitle from '../../../Hooks/useTitle';

const AllBuyers = () => {
    const [info, setInfo] = useState(null)
    const [userDeleteAction, setUserDeleteAction] = useState(false)

    useTitle('All Buyers')

    const closeModal = () => {
        setInfo(null)
    }

    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            try {
                const res = await fetch('https://resell-one.vercel.app/buyers', {
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

    const handleDeleteUser = id => {
        fetch(`https://resell-one.vercel.app/buyers/${id}`, {
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
    const userDelete = (buyer) => {
        setInfo(buyer);
        setUserDeleteAction(true)
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
                            <th>Delete</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            buyers.map((buyer, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={buyer.photoURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{buyer.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {buyer.email}
                                </td>
                                <th>
                                    <label htmlFor="action-modal" onClick={() => userDelete(buyer)} className="btn btn-accent btn-xs">Delete</label>
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

                    userDeleteAction={userDeleteAction}
                    handleDeleteUser={handleDeleteUser}

                ></ConfirmationModel>
            }
        </div>
    );
};

export default AllBuyers;