import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModel from '../../../Components/ConfirmationModel';
import useTitle from '../../../Hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const AllUser = () => {

    const [info, setInfo] = useState(null)
    const [userDeleteAction, setUserDeleteAction] = useState(false)
    const [userMakeAdminAction, setUserMakeAdminAction] = useState(false)

    useTitle('All User')

    const closeModal = () => {
        setInfo(null)
    }

    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await fetch('https://resell-one.vercel.app/users', {
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

    const handleMakeAdmin = id => {
        fetch(`https://resell-one.vercel.app/users/makeadmin/${id}`, {
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
        fetch(`https://resell-one.vercel.app/users/delete/${id}`, {
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
    const userMakeAdmin = (user) => {
        setInfo(user);
        setUserDeleteAction(false)
        setUserMakeAdminAction(true)
    }
    const userDelete = (user) => {
        setInfo(user);
        setUserMakeAdminAction(false)
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
                            <th className='text-center'>Role</th>
                            <th className='text-center'> Admin</th>
                            <th className='text-center'>Delete</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td className='text-center'>
                                    {user?.role === '' ?
                                        <button className="btn btn-success text-white btn-xs" >Buyers</button>
                                        :
                                        <button className="btn btn-success text-white btn-xs" >{user.role}</button>
                                    }
                                </td>

                                <th className='text-center'>
                                    {user?.role === 'admin' ?
                                        <button className="btn btn-xs" >Admin</button>
                                        :
                                        <label htmlFor="action-modal" onClick={() => userMakeAdmin(user)} className="btn btn-secondary btn-xs">Make Admin</label>
                                    }
                                </th>
                                <th className='text-center'>
                                    <label htmlFor="action-modal" onClick={() => userDelete(user)} className="btn btn-accent btn-xs">Delete</label>
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

                    userMakeAdminAction={userMakeAdminAction}
                    handleMakeAdmin={handleMakeAdmin}

                    userDeleteAction={userDeleteAction}
                    handleDeleteUser={handleDeleteUser}

                ></ConfirmationModel>
            }
        </div>
    );
};

export default AllUser;