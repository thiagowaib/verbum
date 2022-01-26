const toolBold = document.querySelector("#tool-bold")
const toolItalic = document.querySelector("#tool-italic")
const editorArea = document.querySelector("#editor-div")

// ? https://www.codeproject.com/Answers/897650/Replacing-selected-text-HTML-JavaScript#answer1
const handleBoldClick = () => {
    let sel, range, node;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            
            let html = '<span style="font-weight:700;">' + range + '</span>'
            range.deleteContents();
            
            let el = document.createElement("div");
            el.innerHTML = html;
            let frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.collapse(false);
        range.pasteHTML(html);
    }
}

// ? https://www.codeproject.com/Answers/897650/Replacing-selected-text-HTML-JavaScript#answer1
const handleItalicClick = () => {
    let sel, range, node;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = window.getSelection().getRangeAt(0);
            
            let html = '<span style="font-style:italic;">' + range + '</span>'
            range.deleteContents();
            
            let el = document.createElement("div");
            el.innerHTML = html;
            let frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.collapse(false);
        range.pasteHTML(html);
    }
}

const preventDoubleDiv = (event) => {
    if (event.key === 'Enter') {
        document.execCommand('insertLineBreak')
        event.preventDefault()
    }    
}


toolBold.addEventListener('mousedown', handleBoldClick)
toolItalic.addEventListener('mousedown', handleItalicClick)
editorArea.addEventListener('keydown', (e) => preventDoubleDiv)