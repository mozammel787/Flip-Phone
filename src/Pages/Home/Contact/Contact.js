import React from 'react';
import { BsCheck2Circle, BsPlus } from 'react-icons/bs';

const Contact = () => {

    const time = Date.now();

    return (
        <div className=" px-4 py-32 bg-gray-50">
            <div className=" rounded-3xl p-8 md:p-12 relative overflow-hidden container mx-auto bg-gradient-to-br from-blue-400/5 to-blue-400/20 border border-blue-200/20 shadow-md">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full transform translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-200/20 to-transparent rounded-full transform -translate-x-16 translate-y-16"></div>

                <div className="flex flex-col lg:flex-row items-center justify-between relative z-10">
                    {/* Left Content */}
                    <div className="flex-1 max-w-2xl mb-8 lg:mb-0 lg:pr-8">
                        <h2 className="text-4xl  font-bold text-gray-900 mb-6 leading-tight">
                            Ready to Sell Your Phone?
                        </h2>

                        <p className="text-gray-600 text-lg  mb-8 leading-relaxed">
                            Get top dollar for your device with our easy listing process. Join thousands
                            of successful sellers.
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-6 mb-8">
                            <ul className='flex items-center gap-6'>
                                <li className='flex items-center gap-3 text-gray-700 font-medium text-lg'> <BsCheck2Circle className='text-2xl text-secondary ' />Free to list</li>
                                <li className='flex items-center gap-3 text-gray-700 font-medium text-lg'> <BsCheck2Circle className='text-2xl text-secondary ' />Secure payments</li>
                                <li className='flex items-center gap-3 text-gray-700 font-medium text-lg'> <BsCheck2Circle className='text-2xl text-secondary ' />Seller protection</li>
                            </ul>

                        </div>

                        {/* CTA Button */}
                        <button className="btn-grad btn flex items-center gap-3 group">
                            <BsPlus className="text-2xl transition-transform group-hover:rotate-90" />
                            List Your Phone
                        </button>
                    </div>

                    {/* Right Phone Illustration */}
                    <div className="flex-shrink-0 relative">
                        <div className="relative">
                            {/* Phone Shadow */}
                            <div className="absolute inset-0 bg-blue-300/20 rounded-3xl transform translate-x-2 translate-y-2 blur-lg"></div>

                            {/* Main Phone */}
                            <div className="relative w-48 h-80 md:w-56 md:h-96 bg-gradient-to-b from-blue-500 to-blue-600 rounded-3xl p-2 shadow-2xl">
                                {/* Screen */}
                                <div className="w-full h-full bg-gradient-to-b from-blue-100 to-white rounded-2xl relative overflow-hidden">
                                    {/* Screen Content - App Icons Grid */}
                                    <div className="p-6 ">
                                        {/* Status Bar */}
                                        <div className="flex justify-between items-center mb-8">
                                            <div className="flex gap-1">
                                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                            </div>
                                            <div className="text-xs text-gray-500 font-medium">{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                            <div className="flex gap-1">
                                                <div className="w-4 h-2 bg-green-300 rounded-sm"></div>
                                            </div>
                                        </div>

                                        {/* App Icons */}
                                        <div className="grid grid-cols-3 gap-4">
                                            {[...Array(9)].map((_, i) => (
                                                <div key={i} className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-sm opacity-80"></div>
                                            ))}
                                        </div>

                                        {/* Dock */}
                                        <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-3">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg"></div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Home Indicator */}
                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-300 rounded-full"></div>
                                </div>

                                {/* Side Buttons */}
                                <div className="absolute -left-1 top-20 w-1 h-8 bg-blue-700 rounded-l-full"></div>
                                <div className="absolute -left-1 top-32 w-1 h-12 bg-blue-700 rounded-l-full"></div>
                                <div className="absolute -right-1 top-24 w-1 h-16 bg-blue-700 rounded-r-full"></div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-bounce opacity-80"></div>
                            <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-secondary rounded-full animate-pulse opacity-60"></div>
                            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-accent rounded-full animate-ping opacity-70"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;