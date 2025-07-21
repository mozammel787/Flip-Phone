import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../AuthCoxtext/AuthProvider';
import Loading from '../Loading/Loading';

const DisplayError = () => {
    const error = useRouteError()
    const { logOut, loading } = useContext(AuthContext)
    const navigate = useNavigate()
    if (loading) {
        return <Loading></Loading>
    }
    const handleLogOut = () => {
        logOut()
        navigate('/login')
    }
    return (
        <section className="flex items-center h-screen p-16  text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl text-gray-400">
                        Error
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Something is wrong!!</p>
                    <p className="mt-4 mb-8 text-gray-600">{error.statusText || error.message}</p>
                    <button onClick={handleLogOut} className="px-8 py-3 font-semibold rounded bg-green-600 text-gray-50">Logout</button>
                </div>
            </div>
        </section>
    );
};

export default DisplayError;