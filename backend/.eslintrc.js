module.exports = {
    "parser": "babel-eslint",
    "env": {
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "prettier/prettier": "error"
    }
};