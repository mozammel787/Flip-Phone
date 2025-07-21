import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import useVerify from '../Hooks/useVerify';
import {  BsPatchCheck,  } from 'react-icons/bs';

const NormalCard = ({ product, setLoading }) => {



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
        advertisement,
        sold,
        booking
    } = product;

    const [isVerify] = useVerify(sellerEmail)

    const discount = ((marketPrice - sellingPrice) / marketPrice * 100).toFixed(0);



    return (
        <>
            <div className="">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 overflow-hidden w-full max-w-sm relative group">

                    <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-emerald-600  shadow-emerald-600/30 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg z-10">
                        {discount}% Off
                    </div>

                    {isVerify && (
                        <div className=" absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-500/30 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm flex items-center">
                            <BsPatchCheck className=" mr-2" />
                            <span >Verified
                            </span>

                        </div>
                    )}

                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-5  flex items-center justify-center relative overflow-hidden">
                        <div className="transform group-hover:scale-105 transition-transform duration-500">
                            <img src={productImg}
                                alt="Google Pixel 6 Pro"
                                className="w-60 h-60 object-contain drop-shadow-lg" />
                        </div>
                    </div>

                    <div className="p-6 space-y-4">

                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{productName}</h3>


                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                                
                                128GB
                            </div>
                            <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                               
                                8GB RAM
                            </div>
                            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
                                {productCondition}
                            </div>
                        </div>



                        <div className="space-y-1">
                            <div className="text-sm text-gray-400 line-through">Market Price: ${marketPrice}</div>
                            <div className="text-3xl font-bold text-gray-900">${sellingPrice}</div>
                            <div className="text-sm text-secondary font-medium">You save ${marketPrice - sellingPrice} • Free shipping</div>
                        </div>


                        <div className="flex gap-3 pt-2">
                            <button className="flex-1 btn-grad text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                                Buy Now
                            </button>
                            <button className="p-3.5 border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default NormalCard;