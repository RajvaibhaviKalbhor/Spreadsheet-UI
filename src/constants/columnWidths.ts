// constants/columnWidths.ts
export type ColumnKey = "jobRequest" | "submitted" | "status" | "submitter" | "url" | "custom";

export const COLUMN_WIDTHS: Record<ColumnKey, number> = {
    jobRequest: 300,
    submitted: 140,
    status: 120,
    submitter: 160,
    url: 200,
    custom: 160,
};
