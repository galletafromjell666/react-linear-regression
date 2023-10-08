const { ipcMain } = require('electron');

function initializeIPCEventHandlers(win) {
    //frameEvent handler
    ipcMain.on('frameEvent', (_, action) => {
        if (action === 'close') {
            win.close();
        }
        if (action === 'minimize') {
            win.minimize();
        }
        if (action === 'maximize') {
            win.isMaximized() ? win.restore() : win.maximize();
        }
    });

    // genericApi example
    ipcMain.on('sendToMain', (_, args) => {
        console.log(args);
    });
}

module.exports = { initializeIPCEventHandlers };
