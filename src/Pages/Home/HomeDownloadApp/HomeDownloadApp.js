import React from 'react';
import { BsCreditCard2Back, BsSearch, BsTruck } from 'react-icons/bs';

const HomeDownloadApp = () => {
    return (
        <section className=" py-32 container mx-auto px-4 text-center">

            <h2 className="text-4xl font-bold text-gray-900 mb-2">How PhoneSwiper Works</h2>
            <p className="text-gray-600 mb-12">Simple steps to buy or sell your phone with confidence</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-12">

                <div className="flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300 p-6 rounded-2xl border border-gray-100 group">
                    <div className="bg-primary/20 text-primary p-4 rounded-full mb-4 border border-primary/10 shadow-xl shadow-primary/10 group-hover:shadow-primary/20 cursor-pointer ">

                        <BsSearch className='text-4xl' />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Find Your Phone</h3>
                    <p className=" text-gray-600 mt-2">Browse thousands of verified listings
                        or search for your specific model</p>
                </div>


                <div className="flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300 p-6 rounded-2xl border border-gray-100 group">
                    <div className="bg-secondary/20 text-secondary p-4 rounded-full mb-4 border border-secondary/10 shadow-lg  shadow-secondary/10 group-hover:shadow-secondary/20 cursor-pointer ">

                        <BsCreditCard2Back className='text-4xl ' />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Secure Purchase</h3>
                    <p className=" text-gray-600 mt-2">Pay securely with buyer protection
                        and verified seller guarantees</p>
                </div>


                <div className="flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300 p-6 rounded-2xl border border-gray-100 group">
                    <div className="bg-accent/20 text-accent p-4 rounded-full mb-4 border border-accent/10 shadow-lg  shadow-accent/10 group-hover:shadow-accent/20 cursor-pointer ">

                        <BsTruck className='text-4xl ' />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Fast Delivery</h3>
                    <p className=" text-gray-600 mt-2">Get your phone delivered quickly
                        with tracking and insurance included</p>
                </div>
            </div>

        </section>
    );
};

export default HomeDownloadApp;