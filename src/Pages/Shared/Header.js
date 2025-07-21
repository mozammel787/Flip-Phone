import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import { AuthContext } from '../../AuthCoxtext/AuthProvider';
import { BsChat, BsHouse, BsPhone, BsSearch, BsTag, BiUser, BsPerson, BsCart2 } from "react-icons/bs";

const Header = () => {
    const { user, logOut } = useContext(AuthContext)


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(() => { })
    }
    const menuItems = <>
        <li className='hover:text-primary indicator group '>
            <Link className='hover:bg-transparent focus:bg-transparent' to='/'>
                <span
                    className="indicator-item indicator-bottom indicator-center badge badge-primary group-hover:opacity-100 opacity-0  h-1"
                ></span>
                <BsHouse className='text-2xl md:text-xl' /> <span className='hidden md:block'>Home</span>
            </Link>
        </li>
        <li className='hover:text-primary indicator group '>
            <Link className='hover:bg-transparent focus:bg-transparent' to='/all-products'>
                <span
                    className="indicator-item indicator-bottom indicator-center badge badge-primary group-hover:opacity-100 opacity-0  h-1"
                ></span>
                <BsSearch className='text-2xl md:text-xl' /> <span className='hidden md:block'>Find Phone</span>
            </Link>
        </li>
        <li className='hover:text-primary indicator group '>
            <Link className='hover:bg-transparent focus:bg-transparent' to='/dashboard/addproduct'>
                <span
                    className="indicator-item indicator-bottom indicator-center badge badge-primary group-hover:opacity-100 opacity-0  h-1"
                ></span>
                <BsTag className='text-2xl md:text-xl' /> <span className='hidden md:block'>Sell Phone</span>
            </Link>
        </li>
        <li className='hover:text-primary indicator group '>
            <Link className='hover:bg-transparent focus:bg-transparent' to='/contact'>
                <span
                    className="indicator-item indicator-bottom indicator-center badge badge-primary group-hover:opacity-100 opacity-0  h-1"
                ></span>
                <BsChat className='text-2xl md:text-xl' /> <span className='hidden md:block'>Contact</span>
            </Link>
        </li>


    </>

    console.log(user);

    return (
        <>
            <header className='bg-white/50 backdrop-blur-xl sticky top-0 z-50 shadow-sm w-full'>

                <div className="navbar max-w-screen-2xl mx-auto  ">
                    <div className="navbar-start">

                        <Link to='/' className='flex items-center gap-2'>
                            <div className='indicator '>
                                <span className="indicator-item badge badge-sm bg-primary border-0  top-[5px] right-[10px] fade-in-out-logo "></span>
                                <BsPhone className='text-3xl md:text-5xl text-primary ' />
                            </div>
                            <div>
                                <h1 className='text-xl md:text-2xl font-bold'>PhoneSwiper</h1>
                                <span className='hidden md:block text-sm opacity-70'>Trusted Phone Marketplace</span>
                            </div>
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0  ">
                            {menuItems}
                        </ul>
                    </div>
                    <div className="navbar-end flex gap-4">
                        {/* <button className="btn btn-outline border-gray-300 normal-case"><BsCart2 className="text-xl mr-3" /> Cart</button> */}
                        {
                            user?.uid ?
                                <>

                                    <div className="dropdown dropdown-end ">
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">

                                                <img src={user?.photoURL} alt='' />
                                            </div>
                                        </label>
                                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><Link className='btn btn-primary mb-2 text-white' to='/dashboard'>Dashboard</Link></li>
                                            <li><button onClick={handleLogOut} className='btn bg-red-800 border-none text-white'>Logout</button></li>
                                        </ul>
                                    </div>

                                </>
                                :
                                <Link to='/login' className="btn btn-grad normal-case"><BsPerson className="text-xl mr-3" /> Login</Link>
                        }


                    </div>
                </div>
            </header>
            <div className=" bg-white/50 backdrop-blur-xl lg:hidden fixed w-full bottom-0 z-50 py-2">
                <ul className="menu flex-row justify-around p-0 mx-auto  ">
                    {menuItems}
                </ul>
            </div>

        </>












    );
};

export default Header;