module.exports = {
    clearMocks: true,
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    testEnvironment: "node",
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ]
};