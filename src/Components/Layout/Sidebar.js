import React from 'react';
import { MdDashboard, MdPhoneIphone, MdShoppingCart, MdSettings } from 'react-icons/md';

const Sidebar = () => {
  return (
    <aside className="hidden md:block bg-gray-50 h-full w-64 p-6 rounded-r-2xl shadow-lg">
      <nav>
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-100 font-medium transition">
              <MdDashboard className="text-xl" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-100 font-medium transition">
              <MdPhoneIphone className="text-xl" />
              <span>Products</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-100 font-medium transition">
              <MdShoppingCart className="text-xl" />
              <span>Orders</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-blue-100 font-medium transition">
              <MdSettings className="text-xl" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
