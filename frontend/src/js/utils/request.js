const defaultOpts = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const request = async ({ url, opts }) => {
    const data = await fetch(url, Object.assign(opts, defaultOpts));
    const res = await data.json();

    return res;
};

export const API_ENDPOINT = "/api/todo";
