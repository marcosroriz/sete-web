module.exports = (config) => {
    if (process.env.APP_ENV === "desktop") {
        config.target = "electron-renderer";
    }
    return config;
};
