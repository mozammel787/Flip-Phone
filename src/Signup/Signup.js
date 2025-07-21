import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthCoxtext/AuthProvider';
import useTitle from '../Hooks/useTitle';
import useToken from '../Hooks/useToken';

const Signup = () => {
    const { createUser, userUpdate, LoginWithPopup } = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider()
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()
    useTitle('Sign Up')
    const imageHostKey = process.env.REACT_APP_imgbb_Key;

    const [loginEmail, setLoginEmail] = useState('')


    const [token] = useToken(loginEmail)

    if (token) {
        navigate('/')
    }
    const handleSignup = data => {
        createUser(data.email, data.password)
            .then(result => {
                setLoginEmail(data.email);
                const image = data.avatar[0];
                const formData = new FormData();
                formData.append('image', image);
                const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(imgData => {
                        if (imgData.success) {
                            // console.log(imgData.data.url);
                            const userPhoto = imgData.data.url
                            const userInfo = {
                                displayName: data.name,
                                photoURL: userPhoto

                            }
                            userUpdate(userInfo)
                                .then(() => {

                                    toast.success('Successfully Sign Up')

                                    let role = "";
                                    if (data.role) {
                                        role = 'seller'
                                    }

                                    userSaveInDb(data.email, data.name, userPhoto, role)


                                })
                                .catch(err => {
                                    const errorMsg = (err.message).split(':').pop().split('(')[0];
                                    const error = (err.message).split('/').pop().split(')')[0];
                                    toast.error(errorMsg)
                                    toast.error(error)
                                })

                        }
                    })
            }
            )
    };




    const handleGoogle = () => {
        LoginWithPopup(googleProvider)
            .then(result => {
                setLoginEmail(result.user.email);
                toast.success('Successfully Sign Up')
                const { email, displayName, photoURL } = result.user
                // console.log(result);
                const role = ""
                userSaveInDb(email, displayName, photoURL, role)

            })
            .catch(err => {
                const errorMsg = (err.message).split(':').pop().split('(')[0];
                const error = (err.message).split('/').pop().split(')')[0];
                toast.error(errorMsg)
                toast.error(error)
            })

    }


    const userSaveInDb = (email, name, photoURL, role) => {
        const user = { email, name, photoURL, role }
        fetch('https://resell-one.vercel.app/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
            })
    }





    return (
        <div className="w-full max-w-md mx-auto lg:my-5 p-8 space-y-3 rounded-xl lg:shadow bg-gray-100 text-gray-800">
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>
            <form onSubmit={handleSubmit(handleSignup)} action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                <div className="space-y-1 text-sm">
                    <label name="name" className="block text-gray-600" >Name</label>
                    <input type="text"
                        className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-green-600"
                        {...register("name",
                            { required: "Name is required" }
                        )} placeholder="Name" />
                    {errors.name && <p role="alert">{errors.name?.message}</p>}
                </div>
                <div className="space-y-1 text-sm">
                    <label name="email" className="block text-gray-600" >Email</label>
                    <input type="email"
                        className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-green-600"
                        {...register("email",
                            { required: "Email Address is required" }
                        )} placeholder="Email" />
                    {errors.email && <p role="alert">{errors.email?.message}</p>}
                </div>
                <div className="space-y-1 text-sm">
                    <label name="avatar" className="block text-gray-600" >Avatar</label>
                    <input type="file"
                        className="file-input file-input-bordered w-full border-gray-300  text-gray-800 focus:border-green-600"
                        {...register("avatar",
                            { required: "Avatar is required" }
                        )} placeholder="Avatar" />
                    {errors.avatar && <p role="alert">{errors.avatar?.message}</p>}
                </div>

                <div className="space-y-1 text-sm">
                    <label name="password" className="block text-gray-600">Password</label>
                    <input type="password" className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-green-600"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters or longer " },
                            pattern: { value: /(?=.*[A-Z](?=.*[0-9])(?=.*[!@#$&*]))/, message: 'Password mast be strong' }
                        }

                        )} placeholder="password" />
                    {errors.password && <p role="alert">{errors.password?.message}</p>}

                </div>
                <div className='w-full mx-auto'>
                    <label htmlFor="Toggle3" className="inline-flex items-center p-2 rounded-md cursor-pointer text-gray-100 ">
                        <input id="Toggle3" type="checkbox" className="hidden peer" {...register("role",

                        )} />
                        <span className="px-4 py-2 rounded-l-md bg-green-600 peer-checked:bg-gray-500">Buyer</span>
                        <span className="px-4 py-2 rounded-r-md bg-gray-500 peer-checked:bg-green-600">Seller</span>
                    </label>
                </div>
                <button className="block w-full p-3 text-center rounded-sm text-gray-50 btn btn-primary">Sign Up</button>
            </form>
            <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                <p className="px-3 text-sm text-gray-600">Login with social accounts</p>
                <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-4">
                <button onClick={handleGoogle} aria-label="Log in with Google" className="p-3 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                </button>

            </div>
            <p className="text-xs text-center sm:px-6 text-gray-600">Don't have an account?
                <Link to='/login' className="underline text-gray-800">Sign in</Link>
            </p>
        </div>
    );
};

export default Signup;