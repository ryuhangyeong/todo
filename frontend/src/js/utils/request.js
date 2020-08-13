const API_ENDPOINT = "/api/todo";

const defaultOpts = {
    headers: {
        "Content-Type": "application/json",
    },
};

export default request = async ({ url, opts = defaultOpts }) => {
    try {
        const data = await fetch(`${API_ENDPOINT}/${url}`, opts);
        const res = await data.json();
        return res;
    } catch (e) {
        throw e;
    }
};
