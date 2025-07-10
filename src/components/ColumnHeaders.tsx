import React from 'react';
import { COLUMN_WIDTHS } from "../constants/columnWidths";
import type { ColumnKey } from "../constants/columnWidths";
import { IoLink } from "react-icons/io5";
import { RefreshCcw } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

export type GroupedHeader = {
    type: 'group';
    name: string;
    icon: string;
    subheaders: { key: string; label: string }[];
};

type Props = {
    groupedHeaders: GroupedHeader[];
    dynamicColumns: string[];
    addDynamicColumn: () => void;
};

const defaultColumns: { key: ColumnKey; name: string; icon: string }[] = [
    { key: "jobRequest", name: "Job Request", icon: "📋" },
    { key: "submitted", name: "Submitted", icon: "📅" },
    { key: "status", name: "Status", icon: "📊" },
    { key: "submitter", name: "Submitter", icon: "👤" },
    { key: "url", name: "URL", icon: "🔗" },
];

// Utility to get background class
const getGroupColorClass = (name: string, isHeader: boolean) => {
    if (name === "ABC") return isHeader ? "bg-green-200 text-black" : "bg-green-100";
    if (name === "Answer a question") return isHeader ? "bg-purple-200 text-black" : "bg-purple-100";
    if (name === "Extract") return isHeader ? "bg-orange-200 text-black" : "bg-orange-100";
    return isHeader ? "bg-gray-300 text-gray-900" : "bg-gray-100";
};

const ColumnHeaders: React.FC<Props> = ({ groupedHeaders, dynamicColumns, addDynamicColumn }) => {
    return (
        <div className="w-full overflow-auto text-sm font-medium" style={{ paddingBottom: "env(safe-area-inset-bottom, 4px)" }}>
            <table className="w-full border-collapse table-fixed">
                <thead>
                    {/* Row 3 – Grouped Headers */}
                    <tr className="border-b bg-white [&>th:last-child]:pr-4">
                        <th className="border-r bg-white" style={{ width: "3rem" }}></th>

                        {/* Title Cell */}
                        <th className="px-2 py-2 border-r bg-gray-100 min-w-[18rem] max-w-[28rem] text-left font-semibold whitespace-nowrap">
                            <div className="flex items-center">
                                <span className="mr-2">
                                    <IoLink className="text-gray-500" />
                                </span>
                                Q3 Financial Overview
                                <span className="ml-2">
                                    <RefreshCcw className="w-4 h-4 ml-1 cursor-pointer" />
                                </span>
                            </div>
                        </th>

                        {/* Empty headers for default columns */}
                        {defaultColumns.slice(1).map((col) => (
                            <th
                                key={col.key}
                                className="bg-white border-r"
                                style={{
                                    width: COLUMN_WIDTHS[col.key],
                                    minWidth: COLUMN_WIDTHS[col.key],
                                    maxWidth: COLUMN_WIDTHS[col.key],
                                }}
                            />
                        ))}

                        {/* Grouped headers */}
                        {groupedHeaders.map((group, index) => {
                            const colSpan = group.subheaders?.length ?? 0;
                            const width = colSpan * COLUMN_WIDTHS.custom;
                            const bgClass = getGroupColorClass(group.name, true);

                            return (
                                <th
                                    key={index}
                                    colSpan={colSpan}
                                    className={`border-r px-2 py-2 text-sm font-semibold ${bgClass}`}
                                    style={{ width: `${width}px` }}
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="flex items-center space-x-1">
                                            <span>{group.icon}</span>
                                            <span>{group.name}</span>
                                            <BsThreeDots className="text-xs text-gray-500" />
                                        </div>
                                    </div>
                                </th>
                            );
                        })}

                        {/* Dynamic Column Headers */}
                        {dynamicColumns.map((colKey, idx) => (
                            <th
                                key={colKey}
                                className="border-r px-2 py-2 text-center text-gray-600 bg-orange-200"
                                style={{
                                    width: COLUMN_WIDTHS.custom,
                                    minWidth: COLUMN_WIDTHS.custom,
                                    maxWidth: COLUMN_WIDTHS.custom,
                                }}
                            >
                                <div className="text-sm">Extra {idx + 1}</div>
                            </th>
                        ))}

                        {/* ➕ Header */}
                        <th
                            className="border-r px-2 py-2 text-center text-gray-600 bg-gray-100 cursor-pointer"
                            onClick={addDynamicColumn}
                            style={{
                                width: COLUMN_WIDTHS.custom,
                                minWidth: COLUMN_WIDTHS.custom,
                                maxWidth: COLUMN_WIDTHS.custom,
                            }}
                        >
                            <AiOutlinePlus className="inline-block text-lg" />
                        </th>
                    </tr>

                    {/* Row 4 – Subheaders */}
                    <tr className="border-b bg-white [&>th:last-child]:pr-4">
                        <th className="border-r px-2 py-2 bg-gray-50 font-normal text-center text-gray-700" style={{ width: "2rem" }}>
                            #
                        </th>

                        {defaultColumns.map((col) => (
                            <th
                                key={col.key}
                                className="border-r px-2 py-2 bg-gray-50 font-normal text-left"
                                style={{
                                    width: COLUMN_WIDTHS[col.key],
                                    minWidth: COLUMN_WIDTHS[col.key],
                                    maxWidth: COLUMN_WIDTHS[col.key],
                                }}
                            >
                                <div className="flex items-center">
                                    <span className="mr-1">{col.icon}</span>
                                    {col.name}
                                    <div className="relative ml-2 w-4">
                                        <select className="absolute left-0 top-0 w-4 h-4 text-transparent bg-transparent appearance-none cursor-pointer">
                                            <option className="text-black">Text</option>
                                            <option className="text-black">Date</option>
                                            <option className="text-black">Number</option>
                                        </select>
                                        <span className="text-gray-500 text-xs">
                                            <IoIosArrowDown />
                                        </span>
                                    </div>
                                </div>
                            </th>
                        ))}

                        {groupedHeaders.map((group, gIdx) =>
                            group.subheaders.map((sub, sIdx) => {
                                const bgClass = getGroupColorClass(group.name, false);
                                return (
                                    <th
                                        key={`sub-${gIdx}-${sIdx}`}
                                        className={`border-r px-2 py-2 font-normal text-left ${bgClass}`}
                                        style={{
                                            width: COLUMN_WIDTHS.custom,
                                            minWidth: COLUMN_WIDTHS.custom,
                                            maxWidth: COLUMN_WIDTHS.custom,
                                        }}
                                    >
                                        {sub.label}
                                    </th>
                                );
                            })
                        )}

                        {/* Dynamic subheaders */}
                        {dynamicColumns.map((colKey, idx) => (
                            <th
                                key={`subheader-${colKey}`}
                                className="border-r bg-orange-100"
                                style={{
                                    width: COLUMN_WIDTHS.custom,
                                    minWidth: COLUMN_WIDTHS.custom,
                                    maxWidth: COLUMN_WIDTHS.custom,
                                }}
                            >
                                Column {idx + 1}
                            </th>
                        ))}

                        {/* Blank ➕ subheader cell */}
                        <th
                            className="border-r bg-gray-100"
                            style={{
                                width: COLUMN_WIDTHS.custom,
                                minWidth: COLUMN_WIDTHS.custom,
                                maxWidth: COLUMN_WIDTHS.custom,
                            }}
                        ></th>
                    </tr>
                </thead>
            </table>
        </div>
    );
};

export default ColumnHeaders;
