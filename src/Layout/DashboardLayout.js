import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Pages/Shared/Header';
import { RiDashboard3Line, RiShoppingCart2Line, RiAddCircleLine } from "react-icons/ri";
import { BsShop } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrUserManager } from "react-icons/gr";
import { HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi";
import { MdOutlineReport,MdSell } from "react-icons/md";
import useAdmin from '../Hooks/useAdmin';
import useSeller from '../Hooks/useSeller';
import { AuthContext } from '../AuthCoxtext/AuthProvider';
import Loading from '../Pages/Shared/Loading/Loading';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    const [isSellerOrAdmin, isSellerOrAdminLoading] = useSeller(user?.email)

    if (isSellerOrAdminLoading || isAdminLoading) {
        return <Loading></Loading>
    }

    return (
        <div >
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content relative ">
                    <div className="pt-10 ">
                         <Outlet></Outlet>
                    </div>
                </div>
                <div className="drawer-side pt-12">
                    <label htmlFor="my-drawer-2" className="drawer-overlay "></label>
                    <ul className=" p-4 w-80 lg:bg-transparent bg-gray-100 text-gray-900 text-lg font-semibold ">
                        <li>
                            <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden text-left text-primary pl-7 m-0  rounded-xl bg-gray-100 absolute top-[40%]   -right-16 "><TbLayoutSidebarRightCollapse className='text-6xl rounded-xl rounded-l-none shadow-l shadow-xl' /></label>
                        </li>
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
                                    <Link to='/dashboard/myorder' className="flex items-center p-2 space-x-3 rounded-md">
                                        <RiShoppingCart2Line />
                                        <span>My Order</span>
                                    </Link>
                                </li>
                               
                            </>}

                        {
                            user?.uid && isSellerOrAdmin &&
                            <>
                                <li><Link to='/dashboard/addproduct' className="flex items-center p-2 space-x-3 rounded-md"><RiAddCircleLine />
                                    <span>Add Product</span></Link></li>
                                <li><Link to='/dashboard/myproduct' className="flex items-center p-2 space-x-3 rounded-md"><BsShop />
                                    <span>My Products</span> </Link></li>
                                <li><Link to='/dashboard/mysell' className="flex items-center p-2 space-x-3 rounded-md"><MdSell />
                                    <span>My Sell</span></Link></li>
                                
                            </>
                        }
                        {
                            user?.uid && isAdmin &&
                            <>
                                <li><Link to='/dashboard/allsell' className="flex items-center p-2 space-x-3 rounded-md"><AiOutlineShoppingCart />
                                    <span>All Sell</span></Link></li>
                                <li><Link to='/dashboard/alluser' className="flex items-center p-2 space-x-3 rounded-md"><HiOutlineUserGroup />
                                    <span>All User</span></Link></li>
                                <li><Link to='/dashboard/allseller' className="flex items-center p-2 space-x-3 rounded-md"><GrUserManager />
                                    <span>All Sellers</span></Link></li>
                                <li><Link to='/dashboard/allbuyers' className="flex items-center p-2 space-x-3 rounded-md"><HiOutlineUsers />
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