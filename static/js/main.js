import {boardsManager} from "./controller/boardsManager.js";
import {domManager} from "./view/domManager.js";
import {dataHandler} from "./data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "./view/htmlFactory.js";

function init() {
    boardsManager.loadBoards();
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

init();
