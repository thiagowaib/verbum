const toolBold = document.querySelector("#tool-bold")
const toolItalic = document.querySelector("#tool-italic")
const toolUnderline = document.querySelector("#tool-underline")
const toolMinus = document.querySelector("#tool-minus")
const toolAdd = document.querySelector("#tool-add")

const editorIframe = document.querySelector("#editor-iframe")
const editorBody = editorIframe.contentWindow.document.body

const fontSizeSpan = document.querySelector("#font-size-span")
let editorFontSize = 14
fontSizeSpan.innerHTML = editorFontSize

richTextField.document.designMode = "On"
editorBody.style.fontSize = `${editorFontSize}px`
editorBody.style.fontWeight = "500"
editorBody.style.fontFamily = "'Barlow', sans-serif"

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
    }
})
toolAdd.addEventListener('mousedown', () => {
    if(editorFontSize<72) {
        editorFontSize++
        editorBody.style.fontSize = `${editorFontSize}px`
        fontSizeSpan.innerHTML = editorFontSize
    }
})