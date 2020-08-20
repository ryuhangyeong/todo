export default (data) => [
    {
        label: "All",
        length: data.length,
    },
    {
        label: "Active",
        length: data.filter((t) => !t.completed).length,
    },
    {
        label: "Completed",
        length: data.filter((t) => t.completed).length,
    },
];
