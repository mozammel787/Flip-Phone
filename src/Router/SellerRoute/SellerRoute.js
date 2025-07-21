import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthCoxtext/AuthProvider';
import useSeller from '../../Hooks/useSeller';
import Loading from '../../Pages/Shared/Loading/Loading';


const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isSellerOrAdmin, isSellerOrAdminLoading] = useSeller(user?.email)
    const location = useLocation()
    if (loading || isSellerOrAdminLoading) {
        return <Loading></Loading>
    }
    if (user && isSellerOrAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default SellerRoute;