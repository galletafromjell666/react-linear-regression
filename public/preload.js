const { contextBridge } = require('electron');

process.once('loaded', () => {
    contextBridge.exposeInMainWorld('test', { test: 'uwu' });
});
