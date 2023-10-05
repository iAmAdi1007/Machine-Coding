const root = document.querySelector('.root');
let tree;
// Fetch JSON Data
async function fetchJSONData() {
    const res = await fetch('./data.json')
    tree = await res.json();
}
// Inserting Node to Tree
function insertNodeToTree(treeData, id, node) {
    if (treeData.id === id) {
        treeData.children.unshift(node);
    }

    let updatedTree = treeData.children?.map(child => {
        return insertNodeToTree(child, id, node);
    })

    return { ...treeData, children: updatedTree }
}
// Add Folder to Tree
async function addFolder(e, id) {
    e.stopPropagation();
    console.log('Before', tree)
    const folderName = prompt('Enter Folder Name')
    if(!folderName) return;
    // tree = await fetchJSONData();
    const node = {
        id: new Date().getTime(),
        type: "folder",
        name: folderName,
        children: []
    }
    tree = insertNodeToTree(tree, id, node)
    console.log('After',tree)
    root.replaceWith(checkDataAndBuildDOM(tree));
    addEventListenertoNodes();
}
// Add File to Tree
async function addFile(e, id) {
    console.log(tree)
    e.stopPropagation();
    const fileName = prompt('Enter File Name')
    if(!fileName) return;
    const node = {
        id: new Date().getTime(),
        type: "file",
        name: fileName,
        children: null
    }
    tree = insertNodeToTree(tree, id, node)
    root.replaceWith(checkDataAndBuildDOM(tree));
    addEventListenertoNodes();
}
// Build DOM
function checkDataAndBuildDOM(data) {
    const parent = document.createElement('div')
    parent.classList.add('alignItem')
    if (data.type === 'folder') {
        parent.classList.add('folder')
        parent.innerHTML = `<span><i class='fa fa-folder'> ${data.name}</i> <button onClick=addFolder(event,${data.id})>Add Folder+</button> <button onClick=addFile(event,${data.id})>Add File+</button></span>`
    } else {
        parent.classList.add('file');
        parent.innerHTML = `<i class='fa fa-file'> ${data.name}</i>`
    }

    data.children?.forEach(child => {
        parent.appendChild(checkDataAndBuildDOM(child));
    })

    return parent;

}

function addEventListenertoNodes(){
    const nodeList = document.querySelectorAll('.folder');
    nodeList.forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            Array.from(node.children).forEach((child, index) => {
                if (index !== 0) {
                    if (Array.from(child.classList).includes('hide')) {
                        child.classList.remove('hide');
                    } else {
                        child.classList.add('hide');
                    }
                }
            })
        })
    })
}
// Runs on Mount
async function init() {
    await fetchJSONData();
    const folderStructure = checkDataAndBuildDOM(tree);
    root.appendChild(folderStructure);
    addEventListenertoNodes();
}

init();
