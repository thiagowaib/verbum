const { app, BrowserWindow } = require('electron')
const path = require('path')

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
    })

    window.loadFile('app/views/editor.html')
}

app.whenReady().then(createWindow)