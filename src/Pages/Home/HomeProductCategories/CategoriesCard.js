import React from 'react';
import { Link } from 'react-router-dom';
import { SiApple, SiGoogle, SiHuawei, SiOneplus, SiSamsung, SiXiaomi } from "react-icons/si";

const CategoriesCard = ({ category }) => {
    const colorMap = {
        orange: {
            gradient: "from-orange-500 to-orange-700",
            hover: "group-hover:from-orange-600 group-hover:to-orange-800"
        },
        gray: {
            gradient: "from-gray-700 to-gray-900",
            hover: "group-hover:from-gray-800 group-hover:to-black"
        },
        blue: {
            gradient: "from-blue-500 to-blue-700",
            hover: "group-hover:from-blue-600 group-hover:to-blue-800"
        },
        green: {
            gradient: "from-green-500 to-green-700",
            hover: "group-hover:from-green-600 group-hover:to-green-800"
        },
        red: {
            gradient: "from-red-500 to-red-700",
            hover: "group-hover:from-red-600 group-hover:to-red-800"
        },
        purple: {
            gradient: "from-purple-500 to-purple-700",
            hover: "group-hover:from-purple-600 group-hover:to-purple-800"
        }
    };
    const IconMap = {

        Apple: () => (
            <SiApple className='text-3xl text-white' />
        ),
        Samsung: () => (
            <SiSamsung className='text-5xl text-white' />
        ),
        Google: () => (
            <SiGoogle className='text-3xl text-white' />
        ),
        OnePlus: () => (
            <SiOneplus className='text-3xl text-white' />
        ),
        Xiaomi: () => (
            <SiXiaomi className='text-3xl text-white' />
        ),
        Huawei: () => (
            <SiHuawei className='text-3xl text-white' />
        )
    };

    const colors = colorMap[category.color] || colorMap.gray;
    const IconComponent = IconMap[category.name];
    return (
        <Link to={`/categories/${category._id}`} class="brand-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 cursor-pointer group">
            <div class="flex flex-col items-center text-center">
                <div class={`phone-icon w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:${colors.hover}`}>
                    {IconComponent && <IconComponent />}
                </div>
                <h3 class="font-semibold text-gray-900 text-lg mb-1">{category.name}</h3>
                <p class="text-sm text-gray-500">{category.description}</p>
            </div>
        </Link>

    );
};

export default CategoriesCard;