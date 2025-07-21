import { useEffect, useState } from 'react';

const useToken = email => {
    const [token, setToken] = useState('')
    useEffect(() => {
        if (email) {
            fetch(`https://resell-one.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.geniusToken) {
                        localStorage.setItem('geniusToken', data.geniusToken)
                        setToken(data.geniusToken)
                    }
                })
        }
    }, [email])
    return [token]
};

export default useToken;