import React from 'react';
import { FaBell, FaFolder, FaSearch } from 'react-icons/fa';

type HeaderBarProps = {
    workspaceName: string;
    sheetName: string;
    user: {
        name: string;
        email: string;
        avatarUrl?: string;
    };
};

const HeaderBar: React.FC<HeaderBarProps> = ({ workspaceName, sheetName, user }) => {
    const handleNotificationClick = () => {
        console.log("🔔 Show notifications");
    };

    return (
        <div className="bg-white text-black px-4 py-2 flex items-center justify-between text-sm border-b shadow-sm">
            {/* Left Section */}
            <div className="flex items-center gap-2">
                <FaFolder className="text-gray-600" />
                <span className="text-gray-500 ">{workspaceName}</span>
                <span className="text-gray-400">&gt;</span>
                <span className="font-semibold text-gray-900">{sheetName}</span>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                    <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
                    <input
                        type="text"
                        placeholder="Search within sheet"
                        className="pl-6 pr-3 py-1 rounded bg-gray-100 text-black placeholder-gray-500 text-sm outline-none"
                    />
                </div>

                {/* Notification */}
                <button onClick={handleNotificationClick} className="text-gray-600 hover:text-gray-900">
                    <FaBell />
                </button>

                {/* User Info */}
                <div className="flex items-center gap-2">
                    <img
                        src={user.avatarUrl || 'https://via.placeholder.com/28'}
                        alt="avatar"
                        className="w-6 h-6 rounded-full"
                    />
                    <div className="text-right leading-tight">
                        <div className="font-medium text-xs text-black">{user.name}</div>
                        <div className="text-[10px] text-gray-500">{user.email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;
