const { ipcRenderer } = require('electron')
const fs = require('fs')
const path = require('path')

// Header Navigation Buttons
const headerNavMinimize = document.querySelector("#header-nav-minimize")
const headerNavFullscreen = document.querySelector("#header-nav-fullscreen")
const headerNavClose = document.querySelector("#header-nav-close")

headerNavMinimize.addEventListener('click', () => {
    ipcRenderer.send('app-minimize')
})
headerNavFullscreen.addEventListener('click', () => {
    ipcRenderer.send('app-fullscreen')
})
headerNavClose.addEventListener('click', () => {
    ipcRenderer.send('app-close')
})

// Header Tools
const headerToolOpen = document.querySelector("#header-tools-open")
const headerToolSave = document.querySelector("#header-tools-save")

headerToolOpen.addEventListener('click', () => {
    ipcRenderer.send("file-open")
})
ipcRenderer.on('get-file-text', (event, ...args) => {
    const filePath = args[0]
    fetch(filePath)
    .then(res => res.text())
    .then(text => editorBody.innerHTML = text)
    .catch(err => console.log(err))
    // 
    // TODO: Find a way to embed .rtf files into the iFrame
    // 
    
})
headerToolSave.addEventListener('click', () => {
    // 
    // TODO: Save Files as .rtf (saving formating and etc...)
    // 
})