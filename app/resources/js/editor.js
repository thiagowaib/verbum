window.onload = () => 
{
    const toolBold = document.querySelector("#tool-bold")
    const toolItalic = document.querySelector("#tool-italic")
    const toolUnderline = document.querySelector("#tool-underline")
    const toolMinus = document.querySelector("#tool-minus")
    const toolAdd = document.querySelector("#tool-add")
    
    const colorSwitch = document.querySelector(".switch").children[0]
    
    const editorIframe = document.querySelector("#editor-iframe")
    const editorBody = editorIframe.contentWindow.document.body
    
    
    const fontSizeSpan = document.querySelector("#font-size-span")
    let editorFontSize = 14
    fontSizeSpan.innerHTML = editorFontSize
    
    // Iframe Text Styling
    richTextField.document.designMode = "On"
    editorBody.style.fontSize = `${editorFontSize}px`
    editorBody.style.fontWeight = "500"
    editorBody.style.fontFamily = "'Barlow', sans-serif"
    
    // Event Behaviors for the Tool Bar
    toolBold.addEventListener('mousedown', () => {
        richTextField.document.execCommand('bold')
    })
    toolItalic.addEventListener('mousedown', () => {
        richTextField.document.execCommand('italic')
    })
    toolUnderline.addEventListener('mousedown', () => {
        richTextField.document.execCommand('underline')
    })
    toolMinus.addEventListener('mousedown', () => {
        if(editorFontSize>4) {
            editorFontSize--
            editorBody.style.fontSize = `${editorFontSize}px`
            fontSizeSpan.innerHTML = editorFontSize
            editorBody.stye.lineHeight = `${editorFontSize}px`
        }
    })
    toolAdd.addEventListener('mousedown', () => {
        if(editorFontSize<72) {
            editorFontSize++
            editorBody.style.fontSize = `${editorFontSize}px`
            fontSizeSpan.innerHTML = editorFontSize
            editorBody.stye.lineHeight = `${editorFontSize}px`
        }
    })
    colorSwitch.addEventListener('click', () => {
        const body = document.querySelector("body")
        const headerTools = document.querySelector(".header-tools").children[0]
        if(colorSwitch.checked) {
            body.style.background = "#16161c"
            body.style.color = "#ffffff"
            for(let i = 0; i<headerTools.children.length; i++) {
                headerTools.children[i].style.color = "#fefefe"
                headerTools.children[i].addEventListener('mouseover', () => {
                    headerTools.children[i].style.color = "#ffffff"
                })
            }
            editorBody.style.background = "#0f0f14"
            editorBody.style.color = "#ffffff"
            editorIframe.style.boxShadow = "0 0 4px rgba(255,255,255,0.2)"
        } else {
            body.style.background = "#ffffff"
            body.style.color = "#282828"
            for(let i = 0; i<headerTools.children.length; i++) {
                headerTools.children[i].style.color = "#282828"
                headerTools.children[i].addEventListener('mouseover', () => {
                    headerTools.children[i].style.color = "#000000"
                })
            }
            editorBody.style.background = "#fefefe"
            editorBody.style.color = "#282828"
            editorIframe.style.boxShadow = "0 0 4px rgba(0,0,0,0.2)"
        }
        
    })
    
    // 
    // * Old Header.js file
    // * Old Header.js file
    // 
    
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
    })
    headerToolSave.addEventListener('click', () => {
        console.log(editorBody)
        let a = document.createElement("a")
        a.setAttribute(
            'href', 
            'data:text/plain;charset=utf-8,' + 
            encodeURIComponent(editorBody.innerHTML)
        )
        a.setAttribute(
            "download",
            "mytext.html"
        )
        a.click()
    })
}