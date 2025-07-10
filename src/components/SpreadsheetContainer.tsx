import React, { useState } from 'react';
import ColumnHeaders from './ColumnHeaders';
import SpreadsheetTable from './SpreadsheetTable';
import { columnGroups } from '../constants/columnGroups';
import type { GroupedHeader } from './ColumnHeaders'; // ✅ Fixes the TS error

const SpreadsheetContainer = () => {
    const [dynamicColumns, setDynamicColumns] = useState<string[]>([]);

    const addDynamicColumn = () => {
        const newKey = `dynamic-${dynamicColumns.length}`;
        setDynamicColumns([...dynamicColumns, newKey]);
    };

    // ✅ Filter only grouped headers
    const groupedHeadersOnly = columnGroups.filter(
        (group): group is GroupedHeader => 'subheaders' in group
    );

    return (
        <div >
            <div className="pr-4">
                <ColumnHeaders
                    groupedHeaders={groupedHeadersOnly}
                    dynamicColumns={dynamicColumns}
                    addDynamicColumn={addDynamicColumn}
                />
            </div>
            <SpreadsheetTable
                dynamicColumns={dynamicColumns}
                addDynamicColumn={addDynamicColumn}
            />
        </div>
    );
};

export default SpreadsheetContainer;
