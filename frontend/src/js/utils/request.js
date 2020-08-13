const API_ENDPOINT = "/api/todo";

const defaultOpts = {
    headers: {
        "Content-Type": "application/json",
    },
};

export default async ({ url, opts }) => {
    const data = await fetch(
        `${API_ENDPOINT}/${url}`,
        Object.assign(opts, defaultOpts)
    );
    const res = await data.json();

    return res;
};
