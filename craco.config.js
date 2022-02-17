module.exports = {
    reactScriptsVersion: "react-scripts",
    webpack: {
        configure: {
            target: process.env.REACT_APP_APP_ENV === "web" ? "web" : "electron-renderer",
        },
    },
};
