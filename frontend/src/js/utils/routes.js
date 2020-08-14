export const getHash = () => {
    let hash = window.location.hash.substring(1);
    if (hash === "") hash = "All";

    return hash;
};
