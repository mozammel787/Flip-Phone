import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const PaymentComplete = () => {
    return (
        <section className="flex items-center flex-col  p-16  text-gray-800 justify-center gap-10 h-screen">
                <h2 className=" font-extrabold text-9xl text-center  text-green-400">
                    <BsFillCheckCircleFill />
                </h2>
                <p className="text-2xl font-semibold md:text-3xl">Your Payment Complete</p>
                <Link to='/' className="px-8 py-3 font-semibold rounded bg-green-600 text-gray-50">Back to homepage</Link>
        </section>
    );
};

export default PaymentComplete;