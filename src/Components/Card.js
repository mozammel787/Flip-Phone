import React, { useContext, useState } from 'react';
import moment from 'moment';
import { MdReport } from "react-icons/md";
import { AuthContext } from '../AuthCoxtext/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useSeller from '../Hooks/useSeller';
import { Link, useNavigate } from 'react-router-dom';
import CardLoader from './CardLoader';
import useVerify from '../Hooks/useVerify';
import { GoVerified } from "react-icons/go";
import BookNowModal from './BookNowModal';
import toast from 'react-hot-toast';


const Card = ({ product, setProductInfo, setDeleteAction, setAdvertiseAction, setReportAction, setLoading }) => {
    const { user } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    const [isSellerOrAdmin, isSellerOrAdminLoading] = useSeller(user?.email)
    const [bookingInfo, setBookingInfo] = useState(null)
    const navigate = useNavigate()

    const {
        productName,
        marketPrice,
        sellingPrice,
        area,
        description,
        purchaseYear,
        productCondition,
        productImg,
        sellerName,
        sellerEmail,
        sellerImg,
        sellerPhone,
        postTime,
        _id,
        advertisement,
        sold,
        booking
    } = product;

    const [isVerify, isVerifyLoading] = useVerify(sellerEmail)

    const handleOpenDeleteModal = () => {
        const info = {
            _id,
            name: productName
        }
        setProductInfo(info)
        // setReportAction(false)
        setAdvertiseAction(false)
        setDeleteAction(true)

    }
    const handleOpenAdvertiseModal = () => {
        const info = {
            _id,
            name: productName
        }
        setProductInfo(info)
        setDeleteAction(false)
        // setReportAction(false)
        setAdvertiseAction(true)

    }
    const handleOpenReportModal = () => {
        const info = {
            _id,
            name: productName
        }
        setProductInfo(info)
        setDeleteAction(false)
        setAdvertiseAction(false)
        setReportAction(true)

    }

    // bookibg
    const handleOpenBookingModal = () => {

        const info = {
            buyerEmail: user?.email,
            buyerName: user?.displayName,
            productName,
            price: sellingPrice,

        }
        setBookingInfo(info)
    }
    const handleAddBooking = event => {

        event.preventDefault()
        const buyerNumber = event.target.buyerNumber.value
        const meetingLocation = event.target.meetingLocation.value
        const buyerInfo = {
            buyerEmail: user?.email,
            buyerName: user?.displayName,
            buyerNumber,
            meetingLocation,
            productName,
            price: sellingPrice,
            productId: _id,
            productImg,
            sellerEmail,
        }
        fetch(`https://resell-one.vercel.app/booking`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('geniusToken')}`
            },
            body: JSON.stringify(buyerInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    navigate('/dashboard/myorder')
                    toast.success('Product is Booked')
                }
            })


        // console.log(buyerNumber, meetingLocation);
        setBookingInfo(null)
    }
    const handleModalClose = () => {
        setBookingInfo(null)
    }

    const time = moment(postTime).format('LL')

    if (isSellerOrAdminLoading || isAdminLoading || isVerifyLoading) {
        return <CardLoader></CardLoader>
    }
    return (
        <>
            <div className="card bg-base-100 shadow-lg border relative overflow-hidden">
                {!sold && advertisement &&
                    <span className="absolute top-40 w-36 shadow-2xl left-0 px-5 py-1 text-xs font-medium tracking-wider text-center uppercase  text-white bg-accent">Advertisement</span>
                }
                {!sold &&
                    <span className="absolute top-32 shadow-2xl  w-36 left-0 px-5 py-1 text-xs font-medium tracking-wider text-center uppercase  text-white bg-primary">Available  </span>
                }

                {!sold && booking &&
                    <span className="absolute top-48 shadow-2xl  w-36 left-0 px-5 py-1 text-xs font-medium tracking-wider text-center uppercase  text-white bg-info">Booked  </span>
                }

                {sold &&
                    <span className="absolute top-72 shadow-2xl  w-full left-0 px-5 py-1 text-2xl font-medium tracking-wider text-center uppercase  text-white bg-black">Sold</span>
                }

                <div className='flex justify-between items-center p-2 md:p-6'>
                    <div className="flex justify-center items-center space-x-4">
                        <img alt="" src={sellerImg} className="object-cover w-12 h-12 rounded-full shadow bg-gray-500" />
                        <div className="flex flex-col text-left space-y-1">
                            <div className='flex items-center gap-2'>
                                <p className="text-sm font-semibold">
                                    {sellerName}</p>
                                {
                                    isVerify &&
                                    <div className="tooltip tooltip-info  tooltip-right" data-tip="verified seller"> <GoVerified className='text-info' />
                                    </div>
                                }
                            </div>
                            <span className="text-xs text-gray-400">{sellerEmail}</span>
                            <span className="text-xs text-gray-400">{sellerPhone}</span>
                        </div>
                    </div>
                    <div className='flex gap-1 md:gap-2 justify-between items-center'>
                        <p className='text-xs font-semibold text-gray-400 '>{time}</p>

                        {user?.email !== sellerEmail && !isAdmin && user?.email&&
                            <label htmlFor="action-modal" onClick={() => handleOpenReportModal()} className="tooltip tooltip-accent" data-tip="Report">
                                <MdReport className='text-error text-2xl' />
                            </label>
                        }
                    </div>
                </div>

                <figure className="px-5 pt-5"><img src={productImg} alt="Album" className='h-80 rounded-lg' /></figure>
                <div className="card-body items-center text-center text-sm font-semibold">
                    <h2 className="card-title">{productName}</h2>
                    <p className='font-light'>{description}</p>
                    <p>Location : {area}</p>
                    <div className='flex justify-center gap-5 text-left'>
                        <div >
                            <p>Purchase Date : {purchaseYear}</p>
                            <p>Market Price : ${marketPrice}</p>
                        </div>
                        <div>
                            <p>Product Condition : {productCondition}</p>
                            <p>Reselling Price : ${sellingPrice}</p>
                        </div>
                    </div>
                    <div className="card-actions w-full justify-center items-center mt-5">
                        {!user?.uid &&
                            <Link to='/login' className="btn btn-primary text-white">Book now</Link>
                        }
                        {user?.uid && !isSellerOrAdmin &&
                            <label onClick={() => handleOpenBookingModal()} htmlFor="Booking-modal" className="btn btn-primary text-white">Book now</label>
                        }

                        {user?.email === sellerEmail && isSellerOrAdmin && !advertisement &&
                            <div className="card-actions w-full justify-between items-center mt-5">
                                <label htmlFor="action-modal" onClick={() => handleOpenAdvertiseModal()} className="btn btn-warning text-white">Advertise</label>
                                <label htmlFor="action-modal" onClick={() => handleOpenDeleteModal()} className="btn btn-accent text-white">Delete</label>
                            </div>
                        }
                        {user?.email !== sellerEmail && isAdmin &&
                            <label htmlFor="action-modal" onClick={() => handleOpenDeleteModal()} className="btn btn-accent text-white">Delete</label>

                        }
                        {
                            user?.email === sellerEmail && isSellerOrAdmin && advertisement &&
                            <label htmlFor="action-modal" onClick={() => handleOpenDeleteModal()} className="btn btn-accent text-white">Delete</label>

                        }
                    </div>
                </div>
            </div>
            {
                bookingInfo &&
                <BookNowModal
                    bookingModalInfo={bookingInfo}
                    handleAddBooking={handleAddBooking}
                    handleModalClose={handleModalClose}
                ></BookNowModal>
            }
        </>
    );
};

export default Card;