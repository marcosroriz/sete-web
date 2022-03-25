const path = require("path");
const { MSICreator } = require("electron-wix-msi");

const msiCreator = new MSICreator({
    appDirectory: path.resolve(__dirname, "out", "sete-win32-x64"),
    outputDirectory: path.resolve(__dirname, "out"),
    exe: "sete.exe",
    iconUrl: "C:\\projects\\sete\\src\\assets\\images\\sete-logo.ico",
    setupIcon: "C:\\projects\\sete\\src\\assets\\images\\installer-icon.ico",
    name: "SETE",
    ui: {
        enabled: true,
        chooseDirectory: true,
        images: {
            background: "C:\\projects\\sete\\src\\assets\\images\\installer-bg.jpg",
            banner: "C:\\projects\\sete\\src\\assets\\images\\top-bg.jpg",
        },
    },
    description: "Software de Gestao do Transporte Escolar",
    manufacturer: "CECATE UFG",
    language: 1046,
    cultures: "pt-BR",
    version: "1.0.0",
});

async function build() {
    await msiCreator.create();
    await msiCreator.compile();
}

build().catch((err) => console.error(`Erro na build ${err}`));
