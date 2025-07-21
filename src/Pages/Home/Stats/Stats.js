import React from 'react';
import {  BsCheck2Circle, BsCreditCard2Back, BsShieldCheck } from 'react-icons/bs';

const Stats = () => {
	return (
		<section className=" py-32 container mx-auto px-4 text-center">

			<h2 className="text-4xl font-bold text-gray-900 mb-2">Why Choose PhoneSwipe</h2>
			<p className="text-gray-600 mb-12">We make buying and selling used phones safe and easy</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-12">

				<div className="flex flex-col items-center text-center">
					<div className="bg-primary/20 text-primary p-4 rounded-full mb-4 border border-primary/10 shadow-xl shadow-primary/10 hover:shadow-primary/20 cursor-pointer ">

						<BsShieldCheck className='text-4xl' />
					</div>
					<h3 className="text-2xl font-semibold text-gray-900">Verified Sellers</h3>
					<p className=" text-gray-600 mt-2">All sellers are verified and rated by our community</p>
				</div>


				<div className="flex flex-col items-center text-center">
					<div className="bg-secondary/20 text-secondary p-4 rounded-full mb-4 border border-secondary/10 shadow-lg  shadow-secondary/10 hover:shadow-secondary/20 cursor-pointer ">

						<BsCreditCard2Back className='text-4xl ' />
					</div>
					<h3 className="text-2xl font-semibold text-gray-900">Secure Payment</h3>
					<p className=" text-gray-600 mt-2">Safe and encrypted payments through trusted processors</p>
				</div>


				<div className="flex flex-col items-center text-center">
					<div className="bg-accent/20 text-accent p-4 rounded-full mb-4 border border-accent/10 shadow-lg  shadow-accent/10 hover:shadow-accent/20 cursor-pointer ">

						<BsCheck2Circle className='text-4xl ' />
					</div>
					<h3 className="text-2xl font-semibold text-gray-900">Buyer Protection</h3>
					<p className=" text-gray-600 mt-2">30-day return policy and money-back guarantee</p>
				</div>
			</div>

		</section>

	);
};

export default Stats;