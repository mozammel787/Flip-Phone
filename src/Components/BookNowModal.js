import React from 'react';

const BookNowModal = ({ bookingModalInfo, handleAddBooking, handleModalClose }) => {
    const { buyerEmail, buyerName, productName, price } = bookingModalInfo;


    return (
        <>
            < input type="checkbox" id="Booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleAddBooking} className="modal-box  mx-auto space-y-3">
                    <label onClick={() => handleModalClose()} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">BOOKING NOW</h3>
                    <div className="w-full">
                        <p className="">Product name : </p>
                        <input defaultValue={productName} readOnly type="text" className="w-full rounded-md p-3
                                 border-gray-100 text-gray-900 border-2" />
                    </div>
                    <div className="w-full">
                        <label className="text-sm">Product Price in USD</label>
                        <input defaultValue={price} readOnly type="text" className="w-full font-semibold rounded-md p-3
                                 border-gray-100 text-gray-900 border-2" />
                    </div>
                    <div className="w-full">
                        <label className="text-sm">Name</label>
                        <input defaultValue={buyerName} readOnly type="text" className="w-full rounded-md p-3
                                 border-gray-100 text-gray-900 border-2" />
                    </div>
                    <div className="w-full">
                        <label className="text-sm">Email</label>
                        <input defaultValue={buyerEmail} readOnly type="text" className="w-full rounded-md p-3
                                 border-gray-100 text-gray-900 border-2" />
                    </div>
                    <div className="w-full">
                        <label className="text-sm">Phone</label>
                        <input name='buyerNumber' type="number" required className="w-full rounded-md p-3
                                 border-gray-100 text-gray-900 border-2" />
                    </div>
                    <div className="w-full">
                        <label className="text-sm">Meeting location</label>
                        <input name='meetingLocation' required type="text" className="w-full rounded-md p-3
                                 border-gray-100 text-gray-900 border-2" />
                    </div>
                    <div className="modal-action">
                        <div className="flex justify-center ">

                            <button type='submit' className="btn btn-primary shadow-sm text-gray-50">Submit</button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    );
};

export default BookNowModal;