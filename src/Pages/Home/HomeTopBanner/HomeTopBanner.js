import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCheck, BsCreditCard2Back, BsPatchCheck, BsPhone, BsSearch, BsShield, BsShieldCheck } from 'react-icons/bs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useVerify from '../../../Hooks/useVerify';

const HomeTopBanner = ({ products }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const [isVerify] = useVerify(products[currentSlide].sellerEmail)


    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
    };

    // Auto-advance slider
    useEffect(() => {
        const timer = setInterval(nextSlide, 4000);
        return () => clearInterval(timer);
    }, []);

    const discount = ((products[currentSlide].marketPrice - products[currentSlide].sellingPrice) / products[currentSlide].marketPrice * 100).toFixed(0);


    return (
        <section className="bg-gradient-to-br from-blue-200/5 to-blue-200/20 text-gray-900">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-32 lg:flex-row lg:justify-between">
                <div className="flex flex-col justify-center text-center rounded-sm w-[50%] lg:text-left ">
                    <span className='text-primary p-2 rounded-full inline-flex gap-3 items-center text-sm '><BsShieldCheck className='text-lg' /> Trusted by 10K+ users</span>
                    <h1 className="text-5xl font-bold  sm:text-6xl m2">Buy & Sell Used <br />
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent text-shadow-lg-purple-600">Phones </span>
                        <br /> with Confidence
                    </h1>
                    <p className="mt-6 mb-8 text-lg sm:mb-10">Verified sellers, secure payments, and unbeatable deals <br /> on smartphones.

                    </p>
                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        <Link to='' className="btn btn-grad"><BsSearch className='text-xl  mr-3' />Shop Now</Link>
                        <Link to='' className="btn  btn-outline btn-primary"><BsPhone className='text-xl  mr-3' />Sell Phone</Link>
                    </div>
                    <div className='flex items-center gap-6 mt-10'>
                        <span className='text-primary flex gap-1 items-center text-md '><div className='p-2 bg-primary/10 rounded-xl'> <BsCheck className='text-xl ' /></div>  10,000+ Phones Sold</span>
                        <span className='text-secondary flex gap-1 items-center text-md'><div className='p-2 bg-secondary/10 rounded-xl'> <BsShield className='text-xl ' /></div> Verified Sellers</span>
                        <span className='text-accent flex gap-1 items-center text-md'><div className='p-2 bg-accent/10 rounded-xl'> <BsCreditCard2Back className='text-xl ' /></div> Secure Payments</span>
                    </div>
                </div>
                <div className=" w-[50%]">
                    {/* Right Phone Slider */}
                    <div className=" max-w-md ml-auto">
                        {/* Slider Container */}
                        <div className="bg-white rounded-3xl  p-6 shadow ">

                            {/* Main Phone Display */}
                            <div className="relative h-80 mb-6 overflow-hidden rounded-2xl">
                                {products.map((phone, index) => (
                                    <div
                                        key={phone.id}
                                        className={`absolute inset-0 transition-all duration-500 ease-out ${index === currentSlide
                                            ? 'opacity-100 translate-x-0'
                                            : index < currentSlide
                                                ? 'opacity-0 -translate-x-full'
                                                : 'opacity-0 translate-x-full'
                                            }`}
                                    >
                                        <div className={` h-full flex items-center justify-center relative rounded-2xl`}>
                                            <img src={products[index].productImg} alt="" className='object-contain h-[340px]' />

                                            <div className="absolute top-1 left-1 bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-emerald-500/30 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                                                {discount}% Off
                                            </div>
                                            {isVerify && (
                                                <div className=" absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-500/30 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center">
                                                    <BsPatchCheck className=" mr-2" />
                                                    <span >Verified
                                                    </span>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Phone Details */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xl font-bold text-gray-900">{products[currentSlide].productName}</h4>
                                    <div className="text-2xl font-bold text-primary">${products[currentSlide].sellingPrice}</div>
                                </div>
                                <div className="flex items-center gap-2">

                                    <div className='flex items-center text-sm text-gray-600'>
                                        <div className="  text-secondary bg-secondary/10 p-2 rounded-full mr-3">
                                            <BsShieldCheck />
                                        </div>
                                        <span className="text-sm text-gray-600">{products[currentSlide].productCondition} Condition</span>

                                    </div>

                                </div>
                            </div>

                            {/* Navigation Controls */}
                            <div className="flex items-center justify-between mt-6">
                                {/* Previous/Next Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={prevSlide}
                                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                                        aria-label="Previous phone"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                                    </button>

                                    <button
                                        onClick={nextSlide}
                                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                                        aria-label="Next phone"
                                    >
                                        <ChevronRight className="w-5 h-5 text-gray-700" />
                                    </button>
                                </div>

                                {/* Dots Indicator */}
                                <div className="flex gap-2">
                                    {products.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                                ? 'bg-primary scale-110'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                                }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                {/* View Details Button */}
                                <button className=" btn btn-grad">
                                    View Details
                                </button>
                            </div>
                        </div>


                    </div>


                </div>
            </div>


        </section>


    );
};

export default HomeTopBanner;