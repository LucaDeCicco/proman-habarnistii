import {boardsManager} from "./controller/boardsManager.js";
import {domManager} from "./view/domManager.js";
import {dataHandler} from "./data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "./view/htmlFactory.js";

async function init() {
    await boardsManager.loadBoards();
    const createBoardBtn = document.querySelector('#createboard')
    createBoardBtn.addEventListener('click', () => {
        const modal = htmlFactory(htmlTemplates.modal)()
        domManager.addChild('#root', modal)
        const closeModal = document.querySelector('#closemodal')
        closeModal.addEventListener('click', () => {
            const modalElement = document.querySelector("#exampleModal")
            modalElement.remove()
        });
        addNewBoard();

    })

    changeBoardTitle();

    // createBoardBtn.addEventListener('click', () => {dataHandler.createNewBoard('ceva');document.querySelector('#root').innerHTML="" ; boardsManager.loadBoards()})
}

function addNewBoard() {
    const saveBtn = document.querySelector('#savenewboard')
    saveBtn.addEventListener('click', () => {
        const title = document.getElementById('newboardtitle').value
        dataHandler.createNewBoard(title);
        const modalElement = document.querySelector("#exampleModal")
        modalElement.remove()
        document.querySelector('#root').innerHTML = "";
        boardsManager.loadBoards()
    })

}


function changeBoardTitle() {
    // const boardId = ev.target.dataset.boardId;

    const boardTitles = document.querySelectorAll(`span.boardtitle[data-board-id]`)

    for (let boardTitle of boardTitles) {
        boardTitle.addEventListener('click', (ev) => {
            domManager.addChild(`.putHereSaveBtn[data-board-id="${ev.target.dataset.boardId}"]`, `<button id="saveBtn">Save</button>`)
            saveNewTitle(ev.target.dataset.boardId)
        }, {once: true})
    }
}


function saveNewTitle(boardId) {
    const saveBtn = document.querySelector("#saveBtn")
    saveBtn.addEventListener('click', () => {
        const newTitle = document.querySelector(`.boardtitle[data-board-id="${boardId}"]`).innerHTML
        console.log(newTitle)
        dataHandler.editBoardTitle(newTitle, boardId);
        saveBtn.remove()
        boardsManager.loadBoards()
    })

}

init();
