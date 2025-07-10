export const columnGroups = [
    { type: "default", key: "jobRequest", label: "Job Request" },
    { type: "default", key: "submitted", label: "Submitted" },
    { type: "default", key: "status", label: "Status" },
    { type: "default", key: "submitter", label: "Submitter" },
    { type: "default", key: "url", label: "URL" },
    {
        type: "group",
        name: "ABC",
        icon: "🧠",
        subheaders: [
            { key: "assigned", label: "Assigned" }
        ],
    },
    {
        type: "group",
        name: "Answer a question",
        icon: "💬",
        subheaders: [
            { key: "priority", label: "Priority" },
            { key: "dueDate", label: "Due Date" }
        ],
    },
    {
        type: "group",
        name: "Extract",
        icon: "📤",
        subheaders: [
            { key: "estimatedValue", label: "Est. Value" }
        ],
    }
];
