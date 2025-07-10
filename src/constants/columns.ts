
export type SubheaderKey = "jobRequest" | "submitted" | "status" | "submitter" | "url" | "custom";

export const defaultColumns: { key: SubheaderKey; label: string }[] = [
    { key: "jobRequest", label: "Job Request" },
    { key: "submitted", label: "Submitted" },
    { key: "status", label: "Status" },
    { key: "submitter", label: "Submitter" },
    { key: "url", label: "URL" },
    { key: "custom", label: "Custom" },
];
