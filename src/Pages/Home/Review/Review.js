import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

const Review = () => {
    const [translateX, setTranslateX] = useState(0);
    const animationRef = useRef();
    const containerRef = useRef();

    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Verified Buyer",
            rating: 5,
            text: "Amazing experience! The iPhone I bought was in perfect condition and arrived quickly. Highly recommend FlipPhone!",
            avatar: "SJ",
            color: "bg-purple-100 text-purple-600"
        },
        {
            id: 2,
            name: "Mike Chen",
            role: "Verified Seller",
            rating: 5,
            text: "Sold my old Samsung Galaxy through FlipPhone and got a great price. The process was smooth and hassle-free.",
            avatar: "MC",
            color: "bg-green-100 text-green-600"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Verified Buyer",
            rating: 5,
            text: "Excellent customer service and quality phones. I've bought three phones here and each one exceeded my expectations.",
            avatar: "ER",
            color: "bg-blue-100 text-blue-600"
        },
        {
            id: 4,
            name: "David Park",
            role: "Verified Seller",
            rating: 5,
            text: "Fast payment and professional service. Sold my MacBook Pro here and couldn't be happier with the experience.",
            avatar: "DP",
            color: "bg-orange-100 text-orange-600"
        },
        {
            id: 5,
            name: "Lisa Thompson",
            role: "Verified Buyer",
            rating: 5,
            text: "Great selection of refurbished phones at amazing prices. Customer support is top-notch and very responsive.",
            avatar: "LT",
            color: "bg-pink-100 text-pink-600"
        },
        {
            id: 6,
            name: "Alex Kumar",
            role: "Verified Buyer",
            rating: 5,
            text: "Best place to buy refurbished electronics. Quality is outstanding and prices are unbeatable. Will definitely shop again!",
            avatar: "AK",
            color: "bg-indigo-100 text-indigo-600"
        }
    ];

    // Duplicate reviews for seamless looping
    const allReviews = [...reviews, ...reviews, ...reviews];

    useEffect(() => {
        const animate = () => {
            setTranslateX(prev => {
                const cardWidth = 400; // Approximate card width including gap
                const totalWidth = reviews.length * cardWidth;

                // Move left by 0.5px per frame (smooth movement)
                const newX = prev - 0.5;

                // Reset position when first set is completely off screen
                if (Math.abs(newX) >= totalWidth) {
                    return 0;
                }

                return newX;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [reviews.length]);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
            />
        ));
    };

    return (
        <div className=" bg-gray-50">
            <div className="container mx-auto py-32 ">
                <div className="text-center mb-12 px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Customer Reviews
                    </h2>
                    <p className="text-gray-600 text-lg">
                        What our customers say about their experience
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="overflow-hidden relative py-10"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
                    }}
                >
                    <div
                        className="flex gap-6 will-change-transform"
                        style={{
                            transform: `translateX(${translateX}px)`,
                            width: 'fit-content'
                        }}
                    >
                        {allReviews.map((review, index) => (
                            <div
                                key={`${review.id}-${Math.floor(index / reviews.length)}`}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-80"
                            >
                                <div className="flex flex-col items-center text-center h-full">
                                    {/* Avatar */}
                                    <div className={`w-16 h-16 rounded-full ${review.color} flex items-center justify-center text-xl font-bold mb-4`}>
                                        {review.avatar}
                                    </div>

                                    {/* Stars */}
                                    <div className="flex items-center gap-1 mb-4">
                                        {renderStars(review.rating)}
                                    </div>

                                    {/* Review text */}
                                    <blockquote className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                                        "{review.text}"
                                    </blockquote>

                                    {/* Author info */}
                                    <div className="flex flex-col items-center mt-auto">
                                        <h4 className="font-semibold text-gray-900 text-base mb-1">
                                            {review.name}
                                        </h4>
                                        <p className="text-gray-500 text-xs">
                                            {review.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Review;