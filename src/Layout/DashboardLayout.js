import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Pages/Shared/Header';
import { RiDashboard3Line, RiShoppingCart2Line, RiAddCircleLine } from "react-icons/ri";
import { BsShop } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { GrUserManager } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineReport } from "react-icons/md";
import useAdmin from '../Hooks/useAdmin';
import useSeller from '../Hooks/useSeller';
import { AuthContext } from '../AuthCoxtext/AuthProvider';
import Loading from '../Pages/Shared/Loading/Loading';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    const [isSellerOrAdmin, isSellerOrAdminLoading] = useSeller(user?.email)
    if (isSellerOrAdminLoading || isAdminLoading) {
        return <Loading></Loading>
    }
    return (
        <div className=''>

            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content relative ">

                    <div className=" ">

                        <Outlet></Outlet>
                    </div>

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
                    <ul className="menu p-4 w-80 bg-gray-100 text-gray-900 text-lg font-semibold">

                        <li className="">
                            <p className="flex items-center p-2 space-x-3 rounded-md text-xl test-center font-bold">
                                <RiDashboard3Line />
                                <span>Dashboard</span>
                            </p>
                            <hr></hr>
                        </li>

                        {
                            user?.uid &&
                            <li>
                                <Link to='/dashboard' className="flex items-center p-2 space-x-3 rounded-md">
                                    <FiShoppingBag />
                                    <span>All Products</span>
                                </Link>
                            </li>
                        }
                        {
                            user?.uid && !isSellerOrAdmin &&
                            <>
                                <li>
                                    <Link className="flex items-center p-2 space-x-3 rounded-md">
                                        <RiShoppingCart2Line />
                                        <span>My Order</span>
                                    </Link>
                                </li>
                                {/* <li><Link>My wish</Link></li> */}
                            </>}

                        {
                            user?.uid && isSellerOrAdmin &&
                            <>
                                <li><Link to='/dashboard/addproduct' className="flex items-center p-2 space-x-3 rounded-md"><RiAddCircleLine />
                                    <span>Add Product</span></Link></li>
                                <li><Link to='/dashboard/myproduct' className="flex items-center p-2 space-x-3 rounded-md"><BsShop />
                                    <span>My Products</span> </Link></li>
                                {/* <li><Link>My buyers</Link></li> */}
                            </>
                        }
                        {
                            user?.uid && isAdmin &&
                            <>

                                <li>
                                    <Link className="flex items-center p-2 space-x-3 rounded-md">
                                        <RiShoppingCart2Line />
                                        <span>My Order</span>
                                    </Link>
                                </li>

                                <li><Link to='/dashboard/allseller' className="flex items-center p-2 space-x-3 rounded-md"><GrUserManager />
                                    <span>All Sellers</span></Link></li>
                                <li><Link to='/dashboard/allbuyers' className="flex items-center p-2 space-x-3 rounded-md"><HiOutlineUserGroup />
                                    <span>All Buyers</span></Link></li>
                                <li><Link to='/dashboard/reporteditems' className="flex items-center p-2 space-x-3 rounded-md"><MdOutlineReport />
                                    <span>Reported Items</span></Link></li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;