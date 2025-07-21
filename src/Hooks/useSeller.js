import { useEffect, useState } from 'react';

const useSeller = email => {
    const [isSellerOrAdmin, setIsSellerOrAdmin] = useState(false)
    const [isSellerOrAdminLoading, setIsSellerOrAdminLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://resell-one.vercel.app/users/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsSellerOrAdmin(data.isSellerOrAdmin)
                    setIsSellerOrAdminLoading(false)
                })
        }
    }, [email])
    return [isSellerOrAdmin, isSellerOrAdminLoading]
};

export default useSeller;