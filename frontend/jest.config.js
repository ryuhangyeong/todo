module.exports = {
    clearMocks: true,
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    testPathIgnorePatterns: ["/helpers"],
    testEnvironment: "node",
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ]
};