import React from 'react';

const ConfirmationModel = ({ closeModal, info, deleteAction, handleDelete, advertiseAction, handleAdvertise ,reportAction,handleReport,userMakeAdminAction,handleMakeAdmin,userDeleteAction, handleDeleteUser,sellerVerifyAction,handleVerified}) => {
    return (
        <>
            <input type="checkbox" id="action-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {advertiseAction &&
                        <>
                            <h2 className="text-xl font-semibold leading-tight tracking-wide bg-warning text-white p-5 mb-5 rounded-xl text-center">
                                Advertise Product
                            </h2>
                            <p className="flex-1 text-center text-gray-600">
                                Are you Advertise {info.name} Item</p>
                        </>
                    }
                    {reportAction &&
                        <>
                            <h2 className="text-xl font-semibold leading-tight tracking-wide bg-error text-white p-5 mb-5 rounded-xl text-center">
                                Report Product
                            </h2>
                            <p className="flex-1 text-center text-gray-600">
                                Are you Report {info.name} Item</p>
                        </>
                    }
                    {deleteAction &&
                        <>
                            <h2 className="text-xl font-semibold leading-tight tracking-wide text-white bg-accent p-5 mb-5 rounded-xl text-center">
                                Are you sure you want to delete ?
                            </h2>
                            <p className="flex-1 text-center text-gray-600">
                                Are you delete {info.name} Item</p>
                        </>
                    }
                    {userMakeAdminAction &&
                        <>
                            <h2 className="text-xl font-semibold leading-tight tracking-wide text-white bg-black p-5 mb-5 rounded-xl text-center">
                                Make Admin
                            </h2>
                            <p className="flex-1 text-center text-gray-600">
                            Do you want to  {info.role} {info.name} an Admin</p>
                        </>
                    }
                    {userDeleteAction &&
                        <>
                            <h2 className="text-xl font-semibold leading-tight tracking-wide text-white bg-accent p-5 mb-5 rounded-xl text-center">
                                Are you sure you want to delete ?
                            </h2>
                            <p className="flex-1 text-center text-gray-600">
                                Are you delete {info.role} {info.name} </p>
                        </>
                    }
                    {sellerVerifyAction &&
                        <>
                           <h2 className="text-xl font-semibold leading-tight tracking-wide text-white bg-info p-5 mb-5 rounded-xl text-center">
                               Verify seller
                            </h2>
                            <p className="flex-1 text-center text-gray-600">
                            Do you want to verify {info.role} {info.name} </p>
                        </>
                    }
                    <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
                        <button onClick={closeModal} className="btn shadow-sm text-gray-50">Cancel </button>

                        {
                        advertiseAction &&
                            <button onClick={() => handleAdvertise(info._id)} className="btn btn-warning shadow-sm text-gray-50">Advertise</button>
                        }
                        {
                        reportAction &&
                            <button onClick={() => handleReport(info._id)} className="btn btn-error shadow-sm text-gray-50">Report</button>
                        }
                        {deleteAction &&
                            <button onClick={() => handleDelete(info._id)} className="btn btn-accent shadow-sm text-gray-50">Delete</button>
                        }
                        {userMakeAdminAction &&
                            <button onClick={() => handleMakeAdmin(info._id)} className="btn btn-black shadow-sm text-gray-50">Make Admin</button>
                        }
                        {userDeleteAction &&
                            <button onClick={() => handleDeleteUser(info._id)} className="btn btn-accent shadow-sm text-gray-50">Delete</button>
                        }
                        {sellerVerifyAction &&
                            <button onClick={() => handleVerified(info._id)} className="btn btn-info shadow-sm text-gray-50"> Verify seller</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationModel;