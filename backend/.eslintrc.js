module.exports = {
    parser: "babel-eslint",
    env: {
        es6: true,
        node: true
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
        sourceType: "module",
    },
    rules: {
        "prettier/prettier": "error",
    },
};
