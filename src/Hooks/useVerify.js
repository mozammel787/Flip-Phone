import { useEffect, useState } from 'react';

const useVerify = email => {
    const [isVerify, setIsVerify] = useState(false)
    const [isVerifyLoading, setIsVerifyLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://resell-one.vercel.app/verify/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsVerify(data.isVerify)
                    setIsVerifyLoading(false)
                })
        }
    }, [email])
    return [isVerify, isVerifyLoading]
};

export default useVerify;