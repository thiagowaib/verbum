const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const fs = require('fs')
const path = require('path')

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

let window = null

const createWindow = () => {
    window = new BrowserWindow({
        minWidth: 600,
        minHeight: 600,
        width: 800,
        height: 600,
        frame: false,
        titleBarStyle: 'hidden',
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        }
    })

    window.loadFile('app/views/editor.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  process.platform !== 'darwin' && app.quit()
})

ipcMain.on('file-open', () => {
  dialog.showOpenDialog({
    properties: ['openFile'],
     filters: [
       {name: "Text Files", extensions: ["txt", "rtf"]}
     ]
  })
  .then((data) => {
      const path = data.filePaths[0]
      window.webContents.send("get-file-text", path)
  })
})

ipcMain.on('app-minimize', () => {
  window.minimize()
})

ipcMain.on('app-fullscreen', () => {
  if(window.isMaximized())
    window.restore()
  else
    window.maximize()
})

ipcMain.on('app-close', () => {
  window.close()
})
