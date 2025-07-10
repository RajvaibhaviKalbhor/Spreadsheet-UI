import React, { useState, useRef, useEffect, useCallback } from 'react';
import { COLUMN_WIDTHS } from '../constants/columnWidths';
import { defaultColumns } from '../constants/columns';
import { columnGroups } from '../constants/columnGroups';
import { AiOutlinePlus } from 'react-icons/ai';

const INITIAL_ROW_COUNT = 20;
const ROW_INCREMENT = 20;
const EXTRA_COLUMN_KEY = '__blank__';

const SpreadsheetTable = ({
    dynamicColumns,
    addDynamicColumn,
}: {
    dynamicColumns: string[];
    addDynamicColumn: () => void;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnKey: string } | null>(null);

    function createEmptyRow(dynamicCols: string[]) {
        const row: Record<string, string> = {};
        defaultColumns.slice(0, 5).forEach((col) => {
            row[col.key] = '';
        });

        let subColCount = 0;
        columnGroups.forEach((group) => {
            group.subheaders?.forEach((sub, idx) => {
                if (subColCount < 4) {
                    row[`${group.name}-${idx}`] = '';
                    subColCount++;
                }
            });
        });

        dynamicCols.forEach((key) => {
            row[key] = '';
        });

        row[EXTRA_COLUMN_KEY] = '';
        return row;
    }

    const [rows, setRows] = useState(
        Array(INITIAL_ROW_COUNT).fill(null).map(() => createEmptyRow(dynamicColumns))
    );

    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 50) {
            setRows((prev) => [
                ...prev,
                ...Array(ROW_INCREMENT).fill(null).map(() => createEmptyRow(dynamicColumns)),
            ]);
        }
    }, [dynamicColumns]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleCellChange = (rowIndex: number, key: string, value: string) => {
        setRows((prev) => {
            const updated = [...prev];
            updated[rowIndex] = { ...updated[rowIndex], [key]: value };
            return updated;
        });
    };

    const getStatusClass = (value: string) => {
        const val = value.toLowerCase();
        if (val === 'in-process') return 'bg-yellow-200 text-yellow-800';
        if (val === 'need to start') return 'bg-gray-300 text-gray-800';
        if (val === 'complete') return 'bg-green-300 text-green-900';
        if (val === 'blocked') return 'bg-red-300 text-red-900';
        return '';
    };

    const getPriorityTextColor = (value: string) => {
        const val = value.toLowerCase();
        if (val === 'high') return 'text-red-600';
        if (val === 'medium') return 'text-yellow-600';
        if (val === 'low') return 'text-blue-600';
        return 'text-gray-800';
    };

    return (
        <div ref={containerRef} className="h-[80vh] overflow-auto border border-gray-300 bg-white">
            <div className="min-w-full flex flex-col">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        <div className="border px-2 py-1 text-gray-500 text-right bg-gray-50" style={{ width: "46px" }}>
                            {rowIndex + 1}
                        </div>

                        {defaultColumns.slice(0, 5).map((col) => {
                            const width = COLUMN_WIDTHS[col.key];
                            const value = row[col.key];
                            const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnKey === col.key;
                            const showStyledStatus = col.key === 'status' && value;

                            return (
                                <div
                                    key={col.key}
                                    className={`px-2 py-1 ${isEditing ? "border-2 border-green-500" : "border"}`}
                                    style={{ width }}
                                >
                                    {isEditing ? (
                                        <EditableCell
                                            value={value}
                                            onChange={(val) => handleCellChange(rowIndex, col.key, val)}
                                            editing={isEditing}
                                            onStartEdit={() => setEditingCell({ rowIndex, columnKey: col.key })}
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full cursor-text text-sm px-1"
                                            onClick={() => setEditingCell({ rowIndex, columnKey: col.key })}
                                        >
                                            {showStyledStatus ? (
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium inline-block ${getStatusClass(value)}`}>
                                                    {value}
                                                </span>
                                            ) : (
                                                value
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {(() => {
                            const rendered: React.ReactNode[] = [];
                            let subColCount = 0;
                            for (const group of columnGroups) {
                                if (!group.subheaders) continue;
                                for (let i = 0; i < group.subheaders.length; i++) {
                                    if (subColCount >= 4) break;
                                    const key = `${group.name}-${i}`;
                                    const value = row[key] || '';
                                    const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnKey === key;
                                    const isPriority = typeof group.subheaders[i]?.key === "string" && group.subheaders[i].key.toLowerCase() === "priority";

                                    rendered.push(
                                        <div
                                            key={key}
                                            className={`px-2 py-1 ${isEditing ? "border-2 border-green-500" : "border"}`}
                                            style={{ width: COLUMN_WIDTHS.custom }}
                                        >
                                            {isEditing ? (
                                                <EditableCell
                                                    value={value}
                                                    onChange={(val) => handleCellChange(rowIndex, key, val)}
                                                    editing={isEditing}
                                                    onStartEdit={() => setEditingCell({ rowIndex, columnKey: key })}
                                                />
                                            ) : (
                                                <div
                                                    className={`w-full h-full cursor-text text-sm px-1 ${isPriority ? getPriorityTextColor(value) : ''}`}
                                                    onClick={() => setEditingCell({ rowIndex, columnKey: key })}
                                                >
                                                    {value}
                                                </div>
                                            )}
                                        </div>
                                    );
                                    subColCount++;
                                }
                                if (subColCount >= 4) break;
                            }
                            return rendered;
                        })()}

                        {dynamicColumns.map((key) => {
                            const value = row[key] || '';
                            const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnKey === key;
                            return (
                                <div
                                    key={key}
                                    className={`px-2 py-1 ${isEditing ? "border-2 border-green-500" : "border"}`}
                                    style={{ width: COLUMN_WIDTHS.custom }}
                                >
                                    <EditableCell
                                        value={value}
                                        onChange={(val) => handleCellChange(rowIndex, key, val)}
                                        editing={isEditing}
                                        onStartEdit={() => setEditingCell({ rowIndex, columnKey: key })}
                                    />
                                </div>
                            );
                        })}

                        <div
                            key="add-column-button"
                            className="px-2 py-1 border text-center text-gray-600 cursor-pointer hover:bg-gray-100"
                            style={{ width: COLUMN_WIDTHS.custom }}

                        >

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EditableCell = ({
    value,
    onChange,
    editing,
    onStartEdit,
}: {
    value: string;
    onChange: (val: string) => void;
    editing: boolean;
    onStartEdit: () => void;
}) => {
    const [temp, setTemp] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => setTemp(value), [value]);
    useEffect(() => {
        if (editing) inputRef.current?.focus();
    }, [editing]);

    const handleBlur = () => onChange(temp);

    return editing ? (
        <input
            ref={inputRef}
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            onBlur={handleBlur}
            className="w-full h-full px-1 outline-none border-none bg-white text-sm"
        />
    ) : (
        <div className="w-full h-full cursor-text text-sm px-1" onClick={onStartEdit}>
            {value}
        </div>
    );
};

export default SpreadsheetTable;
