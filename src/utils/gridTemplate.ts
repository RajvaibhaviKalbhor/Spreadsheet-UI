// utils/gridTemplate.ts
import { COLUMN_WIDTHS } from "../constants/columnWidths";
import { defaultColumns } from "../constants/columns";
import { columnGroups } from "../constants/columnGroups";

export const getGridTemplateColumns = () => {
    const numberColumn = "3rem";
    const titleColumn = "12rem";

    const defaultWidths = defaultColumns.map((col) => `${COLUMN_WIDTHS[col.key]}px`);
    const customWidths: string[] = [];

    columnGroups.forEach((group) => {
        (group.subheaders || []).forEach(() => {
            customWidths.push(`${COLUMN_WIDTHS.custom}px`);
        });
    });


    return [numberColumn, titleColumn, ...defaultWidths, ...customWidths].join(" ");
};
