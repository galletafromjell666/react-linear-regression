const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { initializeIPCEventHandlers } = require('./ipcHandlers');

let win;
function createWindow() {
    win = new BrowserWindow({
        frame: false,
        width: 1200,
        height: 600,
        // comunication between node and electron
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    const appURL = app.isPackaged
        ? url.format({
              pathname: path.join(__dirname, 'index.html'),
              protocol: 'file:',
              slashes: true
          })
        : 'http://localhost:3000';
    win.loadURL(appURL);

    initializeIPCEventHandlers(win);

    if (!app.isPackaged) {
        win.webContents.openDevTools();
    }
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
