const path = require('path')
const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.on('set-title', (event, title) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.setTitle(title)
    })

    const menu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                {
                    click: () => win.webContents.send('update-counter', 1),
                    label: 'Increment',
                },
                {
                    click: () => win.webContents.send('update-counter', -1),
                    label: 'Decrement',
                }
            ]
        }

    ])

    Menu.setApplicationMenu(menu)
    win.loadFile("index.html")
    // win.loadURL("http://www.baidu.com")

    win.webContents.openDevTools()
}

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (canceled) {
        return
    } else {
        return filePaths[0]
    }
}

app.whenReady().then(() => {

    ipcMain.on('counter-value', (_event, value) => {
        console.log(value) // will print value to Node console
    })

    ipcMain.handle('dialog:openFile', handleFileOpen)

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
