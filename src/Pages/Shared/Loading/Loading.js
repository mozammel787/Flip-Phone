import React from 'react';
import './Loading.css'
const Loading = () => {

    return (
        <div className='flex gap-3 justify-center items-center h-screen w-full'>
            <div
                className="bg-secondary p-2  w-6 h-6 rounded-full animate-bounce blue-circle"
            ></div>
            <div
                className="bg-primary p-2 w-6 h-6 rounded-full animate-bounce green-circle"
            ></div>
            <div
                className="bg-accent p-2  w-6 h-6 rounded-full animate-bounce red-circle"
            ></div>
        </div>
    );
};

export default Loading;