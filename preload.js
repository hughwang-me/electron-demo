window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title)
})


contextBridge.exposeInMainWorld('electronAPI2',{
    openFile: () => ipcRenderer.invoke('dialog:openFile')
})

contextBridge.exposeInMainWorld('electronAPI3', {
    handleCounter: (callback) => ipcRenderer.on('update-counter', callback)
})
