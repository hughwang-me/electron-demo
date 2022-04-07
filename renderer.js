const setTitleButton = document.getElementById('btnTitle')
const titleInput = document.getElementById('title')

setTitleButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
});

const openFileButton = document.getElementById('btnOpenFile')
const filePathElement = document.getElementById('filePath')

openFileButton.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile()
    filePathElement.innerText = filePath
})


