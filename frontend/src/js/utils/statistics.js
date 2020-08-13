export default (data) => [
    {
        label: "All",
        count: data.length,
    },
    {
        label: "Active",
        count: data.filter((t) => !t.completed).length,
    },
    {
        label: "Completed",
        count: data.filter((t) => t.completed).length,
    },
];
