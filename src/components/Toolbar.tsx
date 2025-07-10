import React from "react";
import { FaEyeSlash, FaPlus } from "react-icons/fa";
import { BiSortAlt2 } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import { RiSplitCellsVertical } from "react-icons/ri";
import { CiImport, CiExport } from "react-icons/ci";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { HiMiniChevronDoubleRight } from "react-icons/hi2";

// interface ToolbarProps {
//     onNewActionClick: () => void;
// }

// export default function Toolbar({ onNewActionClick }: ToolbarProps) {
//     const handleClick = (action: string) => {
//         console.log(`${action} clicked`);
//     };

export default function Toolbar() {
    const handleClick = (action: string) => {
        console.log(`${action} clicked`);
    };

    return (
        <div className="flex justify-between items-center w-full px-4 py-2 border-b bg-white text-sm">
            {/* Left Side Toolbar */}
            <div className="flex items-center space-x-4 text-gray-700">
                <button onClick={() => handleClick("Tool bar")} className="flex items-center gap-1 hover:text-black">
                    Tool bar <HiMiniChevronDoubleRight />
                </button>
                <button onClick={() => handleClick("Hide fields")} className="flex items-center gap-1 hover:text-black">
                    <FaEyeSlash /> Hide fields
                </button>
                <button onClick={() => handleClick("Sort")} className="flex items-center gap-1 hover:text-black">
                    <BiSortAlt2 />Sort
                </button>
                <button onClick={() => handleClick("Filter")} className="flex items-center gap-1 hover:text-black">
                    <IoFilter /> Filter
                </button>
                <button onClick={() => handleClick("Cell view")} className="flex items-center gap-1 hover:text-black">
                    <RiSplitCellsVertical /> Cell view
                </button>
            </div>

            {/* Right Side Toolbar */}
            <div className="flex items-center space-x-3">
                <button
                    onClick={() => handleClick("Import")}
                    className="flex items-center gap-1 px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
                >
                    <CiImport /> Import
                </button>
                <button
                    onClick={() => handleClick("Export")}
                    className="flex items-center gap-1 px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
                >
                    <CiExport /> Export
                </button>
                <button
                    onClick={() => handleClick("Share")}
                    className="flex items-center gap-1 px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
                >
                    <FaRegShareFromSquare /> Share
                </button>
                <button
                    onClick={() => {
                        console.log("New Action button clicked");

                    }}

                    className="flex items-center gap-1 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
                >
                    <FaPlus /> New Action
                </button>
            </div>
        </div>
    );
}
