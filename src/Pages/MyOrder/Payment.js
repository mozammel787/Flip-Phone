import React, { useContext } from 'react';
import bg from '../../Assets/Payment-Methods.png'
import { AuthContext } from '../../AuthCoxtext/AuthProvider';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import Loading from '../Shared/Loading/Loading';
import useTitle from '../../Hooks/useTitle';

const stripePromise = loadStripe('pk_test_51M6wK5Flny3mXeIa6jKAO6UrumN3zucIXIp4aL6PrchI33Mk2u4yBvMVdUebvZeGaoy8Dj5kuahOzfwXon5hsUfZ001il6UQ0H')

const Payment = () => {

    const { user } = useContext(AuthContext);
    const product = useLoaderData()
    const navigation = useNavigation()
    const { productName, meetingLocation, productImg, description, price } = product;

    useTitle('Payment')

    if (navigation.state === "loading") {
        return <Loading></Loading>
    }
    return (
        <>
            <div className="flex justify-center items-center   py-5">
                <div className="flex flex-col lg:flex-row justify-center items-center w-full  ">

                    {/* Payment Info */}

                    <div className="lg:card lg:flex-shrink-0 w-[90%] lg:w-auto ">
                        <div className="lg:card-body">
                            <h2 className='text-4xl font-bold'>Check Out</h2>
                            <div className="form-control text-neutral-focus">
                                <label className="label">
                                    <span className="label-text " >Name</span>
                                </label>
                                <input type="text" name='name' defaultValue={user?.displayName} readOnly className="input input-bordered text-neutral-focus" />
                                <label className="label">
                                </label>
                            </div>
                            <div className="form-control text-neutral-focus">
                                <label className="label">
                                    <span className="label-text ">Email</span>
                                </label>
                                <input type="email" name='email' defaultValue={user?.email} readOnly className="input input-bordered text-neutral-focus" />
                            </div>
                            <div className="form-control text-neutral-focus">
                                <label className="label">
                                    <span className="label-text ">Meeting Location</span>
                                </label>
                                <input type="text" name='uid' defaultValue={meetingLocation} readOnly className="input input-bordered text-neutral-focus" />
                                <label className="label">
                                </label>
                            </div>

                            {/* payment method info */}
                            <h2 className='mt-1 font-medium'>payment method</h2>
                            <img src={bg} className='w-96' alt="" />
                            <Elements stripe={stripePromise}>
                                <CheckoutForm product={product} />
                            </Elements>
                        </div>

                    </div>

                    {/* Product info */}

                    <div className='card w-96 bg-base-100 justify-center items-center text-neutral-focus rounded-none'>
                        <figure className="px-10 pt-10">
                            <figure><img src={productImg} alt="Movie" /></figure>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{productName}</h2>
                            <p className='text-justify'>{description}</p>
                            <div className="card-actions">
                                <button className='btn btn-outline btn-primary w-full'><input type="radio" className="radio radio-primary  mr-1" checked />Price only $ {price}</button>
                            </div>
                        </div>

                        {/* Buy info */}
                        <div className="form-control mb-3">

                            <label className="input-group">
                                <input type="text" placeholder="Voucher Code" className="input input-bordered text-neutral-focus" />
                                <span className="btn btn-primary">Apply</span>
                            </label>
                        </div>
                        <div className="overflow-x-auto ">
                            <table className="table w-full  text-neutral-focus">
                                <tbody>
                                    <tr>
                                        <td>Course Price </td>
                                        <td>+</td>
                                        <td>$ {price}</td>
                                    </tr>
                                    <tr>
                                        <td>Tax </td>
                                        <td>+</td>
                                        <td> 0</td>
                                    </tr>
                                    <tr>
                                        <td>Voucher </td>
                                        <td>-</td>
                                        <td> 0</td>
                                    </tr>
                                    <tr>
                                        <th>Total </th>
                                        <td> = </td>
                                        <th>$ {price}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Payment;