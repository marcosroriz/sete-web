module.exports = {
    packagerConfig: {
        packageManager: "yarn",
        icon: "./src/assets/images/sete-logo.ico",
    },
    makers: [
        {
            name: "@electron-forge/maker-wix",
            config: {
                iconPath: "C:\\projects\\sete\\src\\assets\\images\\sete-logo.ico",
                name: "SETE",
                ui: {
                    enabled: true,
                    chooseDirectory: true,
                    images: {
                        background: "C:\\projects\\sete\\src\\assets\\images\\installer-bg.jpg",
                        banner: "C:\\projects\\sete\\src\\assets\\images\\top-bg.jpg",
                    },
                },
                manufacturer: "CECATE UFG",
                language: 1046,
                cultures: "pt-BR",
            },
        },
        {
            name: "@electron-forge/maker-dmg",
            config: {
                icon: "./src/assets/images/sete-logo.icns",
                format: "ULFO",
            },
        },
        {
            name: "@electron-forge/maker-deb",
            config: {
                options: {
                    categories: ["Education"],
                    icon: "./src/assets/images/sete-logo.ico",
                },
            },
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {
                options: {
                    categories: ["Education"],
                    icon: "./src/assets/images/sete-logo.png",
                    requires: ["readline"],
                },
            },
        },
    ],
};
