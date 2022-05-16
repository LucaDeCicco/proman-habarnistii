import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {statusesManager} from "./statusesManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            let isNotClick = true

            // let deleteBoardBtn = document.querySelector(`.delete-board-button[data-board-id="${board.id}"]`)
             domManager.addEventListener(
                `.delete-board-button[data-board-id="${board.id}"]`,
                "click", async (event) => {
                    await dataHandler.deleteBoard(board.id)
                     const page = document.querySelector('#root')
                     page.innerHTML = ""
                     await boardsManager.loadBoards()
                 })


            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click", async (event) => {
                    if (isNotClick) {
                        showHideButtonHandler(event)
                        isNotClick = false
                        document.querySelector(`.toggle-board-button[data-board-id="${board.id}"]`).innerHTML = "x"
                        await domManager.addChild(`.board-columns[data-board-id="${board.id}"]`, `<button class="add-card" data-board-id="${board.id}">Add new card</button><br>`)
                        addNewCard()


                    } else {
                        document.querySelector(`.board-columns[data-board-id="${board.id}"]`).innerHTML = ""
                        document.querySelector(`.toggle-board-button[data-board-id="${board.id}"]`).innerHTML = "v"

                        isNotClick = true
                    }
                }
            );
        }

    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;

    statusesManager.loadstatuses(boardId);

    cardsManager.loadCards(boardId);

}

function addNewCard() {
    const addNewCardBtn = document.querySelectorAll(`button.add-card[data-board-id]`)
    for (let btn of addNewCardBtn) {
        btn.addEventListener('click', () => { createNewCard(btn) })
    }
}


function createNewCard(btn) {
    const modal = htmlFactory(htmlTemplates.modal)()
    domManager.addChild('#root', modal)
    const closeModal = document.querySelector('#closemodal')
    closeModal.addEventListener('click', () => {
        const modalElement = document.querySelector("#exampleModal")
        modalElement.remove()
    });
    const saveBtn = document.querySelector('#savenewboard')
    saveBtn.addEventListener('click', () => {
        const title = document.getElementById('newboardtitle').value
        dataHandler.createNewCard(title, btn.dataset.boardId, 1);
        const modalElement = document.querySelector("#exampleModal")
        modalElement.remove()
        document.querySelector('#root').innerHTML = "";
        boardsManager.loadBoards()
    })
}