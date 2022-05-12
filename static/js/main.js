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
        changeBoardTitle();

    })

}

// let isBtn = true


function changeBoardTitleHandler(boardTitle) {
    let isBtn = Array.from(boardTitle.closest(".board-content").querySelectorAll('.saveBtn'))
    if (isBtn.length < 1) {
        domManager.addChild(`.putHereSaveBtn[data-board-id="${boardTitle.dataset.boardId}"]`, `<button class="saveBtn">Save</button>`)
        // isBtn = false
        saveNewTitle(boardTitle.dataset.boardId)
    }
}


function changeBoardTitle() {
    const boardTitles = document.querySelectorAll(`span.boardtitle[data-board-id]`)

    for (let boardTitle of boardTitles) {
        boardTitle.removeEventListener('click', () => changeBoardTitleHandler(boardTitle),)
        boardTitle.addEventListener('click', () => changeBoardTitleHandler(boardTitle),)
    }

}


function saveNewTitle(boardId) {
    const saveBtn = document.querySelector(`.putHereSaveBtn[data-board-id="${boardId}"] .saveBtn`)
    saveBtn.addEventListener('click', () => {
        const newTitle = document.querySelector(`.boardtitle[data-board-id="${boardId}"]`).innerHTML
        dataHandler.editBoardTitle(newTitle, boardId);
        saveBtn.remove()
        // isBtn = true
        // boardsManager.loadBoards()
    })

}

init();
