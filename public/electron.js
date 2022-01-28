const path = require("path");

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
    });

    win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

const fs = require("fs");
const fsPromisses = fs.promises;

ipcMain.on("renderer/open_file", async (event) => {
    try {
        const { canceled, filePaths } = await dialog.showOpenDialog();
        if (canceled) {
            event.reply("main/open_file", { response: { status: 400 } });
            return;
        }
        const buffer = await fsPromisses.readFile(filePaths[0], { encoding: "utf-8" });
        event.reply("main/open_file", { response: { status: 200, data: buffer } });
    } catch (err) {
        console.log("err", err);
    }
});
