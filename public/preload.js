const { ipcRenderer, contextBridge } = require('electron');

process.once('loaded', () => {
    contextBridge.exposeInMainWorld('test', { test: 'uwu' });
});

// this allows comunication between the renderer and the main process
contextBridge.exposeInMainWorld('custom_app', {
    /* genericApi serves as example 
    it's usage will be the following:

    window.custom_app.genericApi.receive("receiveFromMain", (data) => {
        console.log(`Received ${data} from main process`)
    });

     window.custom_app.genericApi("sendToMain", {data : "important data"});
    */
    genericApi: {
        send: (channel, data) => {
            let validChannels = ['sendToMain'];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ['receiveFromMain'];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    },
    customFrame: {
        sendFrameEvent(action) {
            ipcRenderer.send('frameEvent', action);
        }
    }
});
