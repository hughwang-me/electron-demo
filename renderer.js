const setTitleButton = document.getElementById('btnTitle')
const titleInput = document.getElementById('title')

setTitleButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
});

const openFileButton = document.getElementById('btnOpenFile')
const filePathElement = document.getElementById('filePath')

openFileButton.addEventListener('click', async () => {
    const filePath = await window.electronAPI2.openFile()
    filePathElement.innerText = filePath
})


const counter = document.getElementById('counter')

window.electronAPI3.handleCounter((event, value) => {
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue
    event.sender.send('counter-value', newValue)
})

